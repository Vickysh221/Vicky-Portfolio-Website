#!/bin/zsh
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

THUMBS_DIR="src/images/covers/thumbs"
PREVIEWS_DIR="src/images/covers/previews"

mkdir -p "$THUMBS_DIR" "$PREVIEWS_DIR"

build_thumb() {
  local input="$1"
  local output="$2"

  ffmpeg -y -i "$input" \
    -vf "scale=600:380:force_original_aspect_ratio=increase,crop=600:380" \
    -frames:v 1 \
    -q:v 3 \
    "$output" >/dev/null 2>&1
}

build_video_preview() {
  local input="$1"
  local video_output="$2"
  local poster_output="$3"

  ffmpeg -y -i "$input" \
    -an \
    -vf "scale=600:380:force_original_aspect_ratio=increase,crop=600:380,fps=16" \
    -t 6 \
    -c:v libx264 \
    -preset veryfast \
    -crf 32 \
    -pix_fmt yuv420p \
    "$video_output" >/dev/null 2>&1

  ffmpeg -y -i "$input" \
    -vf "scale=600:380:force_original_aspect_ratio=increase,crop=600:380" \
    -frames:v 1 \
    -q:v 3 \
    "$poster_output" >/dev/null 2>&1
}

build_thumb "src/images/covers/cover-lang.png" "$THUMBS_DIR/cover-lang.jpg"
build_thumb "src/images/covers/cover-fuli.png" "$THUMBS_DIR/cover-fuli.jpg"
build_thumb "src/images/covers/cover-simo.png" "$THUMBS_DIR/cover-simo.jpg"
build_thumb "src/images/covers/cover-interior.png" "$THUMBS_DIR/cover-interior.jpg"
build_thumb "src/images/covers/cover-cam.png" "$THUMBS_DIR/cover-cam.jpg"
build_thumb "src/images/covers/cover-avp.png" "$THUMBS_DIR/cover-avp.jpg"
build_thumb "src/images/covers/cover-drv.png" "$THUMBS_DIR/cover-drv.jpg"
build_thumb "src/images/covers/cover-slam.png" "$THUMBS_DIR/cover-slam.jpg"
build_thumb "src/images/covers/cover-gesture.png" "$THUMBS_DIR/cover-gesture.jpg"
build_thumb "src/images/covers/cover-components.png" "$THUMBS_DIR/cover-components.jpg"
build_thumb "src/images/driver-info/slide01-img03.png" "$THUMBS_DIR/cover-driver-info.jpg"
build_thumb "src/images/jiduagent/slide01-img01.png" "$THUMBS_DIR/cover-jidu-agent.jpg"

build_video_preview "src/images/covers/2d3d.mov" "$PREVIEWS_DIR/2d3d-preview.mp4" "$PREVIEWS_DIR/2d3d-poster.jpg"
build_video_preview "src/images/companions/dancing.mp4" "$PREVIEWS_DIR/companions-dancing-preview.mp4" "$PREVIEWS_DIR/companions-dancing-poster.jpg"

echo "Home preview assets generated in $THUMBS_DIR and $PREVIEWS_DIR"
