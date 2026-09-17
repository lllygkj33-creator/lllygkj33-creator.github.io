"""滑窗扫描: 每 hop 秒取一个 window 秒的音频让模型听, 记下说了什么。
唱歌识别不准没关系, 只要窗口里出现歌词里的字, DTW 就能定位。

用法: python3.12 scan.py song16k.wav sherpa-onnx-paraformer-zh-small-2024-03-09 2.0 0.5 > windows.json
"""
import json
import sys
import wave

import numpy as np
import sherpa_onnx

WIN = float(sys.argv[3]) if len(sys.argv) > 3 else 2.0
HOP = float(sys.argv[4]) if len(sys.argv) > 4 else 0.5


def main():
    wav, model_dir = sys.argv[1], sys.argv[2]
    w = wave.open(wav)
    assert w.getframerate() == 16000
    pcm = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768.0

    files = __import__('os').listdir(model_dir)
    model = 'model.int8.onnx' if 'model.int8.onnx' in files else 'model.onnx'
    rec = sherpa_onnx.OfflineRecognizer.from_paraformer(
        paraformer=f'{model_dir}/{model}', tokens=f'{model_dir}/tokens.txt',
        num_threads=4, sample_rate=16000, feature_dim=80, decoding_method='greedy_search')

    win, hop = int(WIN * 16000), int(HOP * 16000)
    windows = []
    for start in range(0, len(pcm) - win, hop):
        s = rec.create_stream()
        s.accept_waveform(16000, pcm[start:start + win])
        rec.decode_stream(s)
        windows.append({'t': round(start / 16000, 2), 'text': s.result.text})

    json.dump(windows, sys.stdout, ensure_ascii=False)
    print(f'[scan] {len(windows)} 个窗口, 窗口 {WIN}s / 步长 {HOP}s', file=sys.stderr)


if __name__ == '__main__':
    main()
