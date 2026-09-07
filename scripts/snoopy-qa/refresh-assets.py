"""Optional maintenance tool: fetch the credited originals, never upscale thumbnails.

Requires Pillow: python -m pip install Pillow
Run from any directory. Re-review every changed image before publishing.
"""
import io
import json
from pathlib import Path
from urllib.request import Request, urlopen
from PIL import Image, ImageChops, ImageOps

ROOT = Path(__file__).resolve().parents[2]
for asset in json.loads((ROOT / 'images/snoopy/sources.json').read_text()):
    request = Request(asset['url'], headers={'User-Agent': 'Mozilla/5.0'})
    with urlopen(request, timeout=45) as response:
        image = Image.open(io.BytesIO(response.read()))
        image.load()
    image = ImageOps.exif_transpose(image).convert('RGB')
    original = image.size
    if asset['trim_white']:
        # Remove empty white margins, not any part of the drawing or its credits.
        mask = ImageChops.difference(image, Image.new('RGB', image.size, 'white'))
        bounds = mask.convert('L').point(lambda x: 255 if x > 15 else 0).getbbox()
        if bounds:
            image = ImageOps.expand(image.crop(bounds), border=16, fill='white')
    image.thumbnail((1000, 1000), Image.Resampling.LANCZOS)
    output = ROOT / 'images/snoopy' / asset['file']
    image.save(output, 'WEBP', lossless=asset['trim_white'], quality=90, method=6)
    print(f'{output.name}: {original} → {image.size}; {output.stat().st_size:,} bytes', flush=True)
