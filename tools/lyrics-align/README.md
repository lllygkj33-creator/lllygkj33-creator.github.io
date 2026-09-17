# 歌词自动对齐（本地小模型）

给 `public/audio/song.lrc` 里的每行歌词找出真实时间。唱歌识别不准，所以不直接采信模型给的绝对时间，
而是让模型"每 0.5 秒看一个 2 秒窗口说听到了什么"，再在窗口时间轴上求最优划分。

## 步骤

```bash
# 0) 依赖（Python 3.12）
python3.12 -m pip install numpy sherpa-onnx

# 1) 音频转 16k 单声道（macOS 自带 afconvert，无需 ffmpeg）
afconvert -f WAVE -d LEI16@16000 -c 1 public/audio/song.mp3 work/song16k.wav

# 2) 下载中文模型（GitHub release，不要去 HuggingFace：这里不通）
#    https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-paraformer-zh-2023-09-14.tar.bz2
curl -L -o model.tar.bz2 https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-paraformer-zh-2023-09-14.tar.bz2
tar xjf model.tar.bz2

# 3) 滑窗扫描：每个窗口听到的字（约 2 分钟）
python3.12 tools/lyrics-align/scan.py work/song16k.wav sherpa-onnx-paraformer-zh-2023-09-14 2.0 0.25 > work/windows.json

# 4) 对齐：输出对照表，--write 直接写新 LRC
python3.12 tools/lyrics-align/locate.py public/audio/song.lrc work/windows.json work/song16k.wav --write public/audio/song.lrc
```

## 对齐怎么算的

1. **归属**：每个窗口归给"命中最多个字"的那一行；
2. **划分**：用 DP 求每行的分界点，让"段内所有窗口的命中数之和"最大（行序严格递增，现有 LRC 的时间只当作弱先验）；
3. **起音**：行首取段内第一个归属本行且命中 ≥2 字的窗口，抢不到就用持续证据，再不行就前后行插值；
4. **夹边界**：用能量包络（峰值 −10dB）掐出人声区间，尾部掌声/尾奏不会把歌词拖走。

`locate.py` 的输出每行都带"选中时间点实际听到什么"，用来人工核对——唱腔识别是错的，但错得稳定。

## 注意

- 每次改 mp3 都要重新跑（时间戳跟着音频走）。
- 副歌重复的行（如"爱你但说不出口"）靠单调约束 + 弱先验区分，若发现串位，调 `locate.py` 顶部的 `LAMBDA_ABS`。
- 模型目录不要提交到仓库（约 230MB）。
