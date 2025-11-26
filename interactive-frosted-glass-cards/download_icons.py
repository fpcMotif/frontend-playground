#!/usr/bin/env python3
"""下载 GitHub 和 Threads 图标到 public 目录"""

import urllib.request
import os

# 确保 public 目录存在
os.makedirs("public", exist_ok=True)

# 图标 URLs
icons = {
    "github-mark-white.png": "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
    "threads.png": "https://static.cdninstagram.com/rsrc.php/v3/yE/r/6-h-xKgS03X.png"
}

print("开始下载图标...")

for filename, url in icons.items():
    try:
        output_path = os.path.join("public", filename)
        print(f"正在下载 {filename}...")
        urllib.request.urlretrieve(url, output_path)
        print(f"✓ {filename} 下载成功")
    except Exception as e:
        print(f"✗ {filename} 下载失败: {e}")

print("\n下载完成！")

