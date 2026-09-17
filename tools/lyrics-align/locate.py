"""把歌词行对到音频上：在扫描窗口上求"每行分界点"的最优划分。

证据: 第 i 行的字在某个窗口里出现了几个 —— 整段累加越大越好(用所有窗口, 不用单点峰值)。
约束: 分界点严格递增; 用现有 LRC 的行间隔/绝对时间做弱先验, 化解重复副歌的歧义。
唱腔识别不准也没关系: 只要"哪个字在这一秒被听到"是对的, 划分就跟着证据走。

用法: python3.12 locate.py song.lrc windows.json [--write out.lrc]
"""
import json
import re
import sys
import wave

import numpy as np

LINE_RE = re.compile(r'^\[(\d+):(\d+(?:\.\d+)?)\]\s*(.*)$')
LAMBDA_GAP = 0.25      # 段长与先验间隔差 1 秒扣多少分
LAMBDA_ABS = 0.02      # 分界点偏离先验 1 秒扣多少分
MAX_GAP = 40.0         # 允许的最大行间隔(秒)
BAND = 60.0            # 只在先验时间 ±60 秒内找分界点


def vocal_end(wav):
    """用能量包络找最后一句人声的位置: 后半段里最后一次超过 (峰值-10dB) 的 3 秒区间。
    尾部常是掌声/尾奏, 旧时间先验在那里完全不可信, 必须夹住。"""
    w = wave.open(wav)
    pcm = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768.0
    sr = w.getframerate()
    hop = sr // 2
    frames = np.array([np.sqrt((pcm[i:i + hop] ** 2).mean()) for i in range(0, len(pcm) - hop, hop)])
    smooth = np.convolve(frames, np.ones(6) / 6, 'same')          # 3 秒平滑
    thr = smooth.max() * 10 ** (-10 / 20)                          # 峰值 -10dB
    idx = np.nonzero(smooth > thr)[0]
    return idx[-1] * 0.5 if len(idx) else len(pcm) / sr


def norm(s):
    return re.sub(r'[^\w\u4e00-\u9fff]', '', s).lower()


def load_lines(path):
    out = []
    for line in open(path, encoding='utf-8'):
        m = LINE_RE.match(line.strip())
        if m:
            out.append((int(m.group(1)) * 60 + float(m.group(2)), m.group(3).strip()))
    return out


def main():
    src, windows_path = sys.argv[1], sys.argv[2]
    write_to = sys.argv[sys.argv.index('--write') + 1] if '--write' in sys.argv else None

    lines = load_lines(src)
    windows = json.load(open(windows_path, encoding='utf-8'))
    v_end = vocal_end(sys.argv[3]) if len(sys.argv) > 3 and sys.argv[3].endswith('.wav') else None
    hop = windows[1]['t'] - windows[0]['t']
    T = np.array([w['t'] for w in windows])
    m, n = len(windows), len(lines)
    win_chars = [set(norm(w['text'])) for w in windows]
    old = np.array([t for t, _ in lines])

    # C[i][j]: 第 i 行的字在窗口 j 出现了几个（只算出现与否）
    C = np.zeros((n, m))
    for i, (_, text) in enumerate(lines):
        cs = set(norm(text))
        if cs and not text.startswith('（'):
            C[i] = [len(cs & wc) for wc in win_chars]
    P = np.hstack([np.zeros((n, 1)), np.cumsum(C, axis=1)])[:, :m]   # P[i][j] = sum_{k<j} C[i][k]

    NEG = -1e9
    g = np.arange(1, min(int(MAX_GAP / hop) + 1, m))
    gap_prior = np.array([max(1.0, old[i] - old[i - 1]) if i else 0.0 for i in range(n)])

    D = np.full((n, m), NEG)                                      # D[i][j]: 安排完 0..i 行, 第 i 行结束于窗口 j
    back = np.zeros((n, m), dtype=np.int32)

    for i in range(n):
        lo = int(max(0, (old[i] - BAND) / hop))
        hi = int(min(m - 1, (old[i] + BAND) / hop))
        prior = -LAMBDA_ABS * np.abs(T - old[i])
        if i == 0:
            D[0, lo:hi + 1] = P[0, lo:hi + 1] + prior[lo:hi + 1]
            continue
        if v_end is not None and i < n - 1:      # 歌词行必须在人声区间内结束
            hi = min(hi, int((v_end + 1.0) / hop))
        Q = D[i - 1] - P[i]                                       # 段 i 从 j' 开始, 段内命中 = P[i][j]-P[i][j']
        best = np.full(m, NEG)
        bestg = np.ones(m, dtype=np.int32)
        for gg in g:
            shifted = np.full(m, NEG)
            shifted[gg:] = Q[:m - gg] - LAMBDA_GAP * abs(gg * hop - gap_prior[i])
            upd = shifted > best
            best[upd] = shifted[upd]
            bestg[upd] = gg
        D[i, lo:hi + 1] = P[i, lo:hi + 1] + best[lo:hi + 1] + prior[lo:hi + 1]
        back[i, lo:hi + 1] = bestg[lo:hi + 1]

    # 回溯出每行的结束窗口, 起点 = 上一行结束窗口的下一格
    ends = np.zeros(n, dtype=int)
    cur = int(np.argmax(D[n - 1]))
    ends[n - 1] = cur
    for i in range(n - 1, 0, -1):
        cur = cur - back[i, cur]
        ends[i - 1] = max(0, cur)

    # 逐窗口归属: 这一秒最像哪一行（比"绝对命中字数"稳, 不会把上一行的残字算成下一行的起音）
    owner = C.argmax(axis=0)
    owner[C.max(axis=0) == 0] = -1
    owned = {}
    for j in range(1, m - 1):
        if owner[j] >= 0 and owner[j] == owner[j + 1]:      # 连续两个窗口才算归它
            owned.setdefault(int(owner[j]), []).append(j)

    # 起音三级判定: 1) 段内归属本行且命中>=2字的窗口 2) 段内持续证据 3) 前后行插值
    starts = [None] * n
    for i in range(n):
        text = lines[i][1]
        cs = set(norm(text))
        if text.startswith('（前'):
            starts[i] = 0.0
            continue
        if text.startswith('（尾'):
            starts[i] = float(v_end) if v_end else T[-1]
            continue
        a = ends[i - 1] + 1 if i else 0
        b = ends[i]
        own = [j for j in owned.get(i, []) if a <= j <= b and C[i][j] >= 2]
        if own:
            starts[i] = T[own[0]]
            continue
        thresh = max(2.0, 0.2 * len(cs))
        hit = [j for j in range(a, b + 1)
               if C[i][j] >= thresh and C[i][j:j + 6].sum() >= 0.6 * len(cs)]
        if hit:
            starts[i] = T[hit[0]]
    # 剩下的按前后已知行线性插值
    known = [i for i in range(n) if starts[i] is not None]
    for i in range(n):
        if starts[i] is not None:
            continue
        prev = [k for k in known if k < i]
        nxt = [k for k in known if k > i]
        p_, n_ = (prev[-1] if prev else 0), (nxt[0] if nxt else n - 1)
        lo = starts[p_] if prev else 0.0
        hi = starts[n_] if nxt else (v_end or T[-1])
        starts[i] = lo + (hi - lo) * (i - p_) / max(1, n_ - p_)
    start = np.array(starts, dtype=float)
    for i in range(1, n):
        if start[i] <= start[i - 1]:
            start[i] = start[i - 1] + 0.5

    print(f'[locate] {n} 行歌词 / {m} 个窗口 (步长 {hop}s)')
    for i, (t_old, text) in enumerate(lines):
        k = int(min(m - 1, (start[i] + 1.0) / hop))
        heard = ' | '.join(windows[max(0, k - 1) + d]['text'][:10] for d in range(3))
        hits = ' '.join(f'{C[i][int(min(m - 1, (start[i] + x) / hop))]:.0f}' for x in (0, 1, 2, 3))
        print(f'  {i:2d} {t_old:6.2f} -> {start[i]:6.2f} ({start[i] - t_old:+5.1f}s) [{hits}] '
              f'{text[:12]:<14} 听到: {heard}')

    assert all(start[i] < start[i + 1] for i in range(n - 1)), '必须严格递增'
    if write_to:
        open(write_to, 'w', encoding='utf-8').write(
            '\n'.join(f'[{int(start[i]) // 60:02d}:{start[i] % 60:05.2f}] {tx}'
                      for i, (_, tx) in enumerate(lines)) + '\n')
        print('[locate] 已写入', write_to)


if __name__ == '__main__':
    main()
