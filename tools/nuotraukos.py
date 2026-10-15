"""Nuotraukų variantai ir IMGW manifestas (žr. README „Nuotraukos").

  Naujas / pakeistas kadras:
    uv run --with pillow python tools/nuotraukos.py add <originalas.jpg> spaces/tp-kc-9
  Tik manifestas (perskaito assets/img ir perrašo IMGW faile assets/js/data.js):
    uv run --with pillow python tools/nuotraukos.py manifest

Variantai: <vardas>.jpg (≤ 1600 px), <vardas>-800.jpg ir, jei originalas ≥ 1900 px, <vardas>-<iki 2400>.jpg.
sRGB, be EXIF, JPEG q80 progressive. Pakeitus failą tuo pačiu vardu — pakelti IMG_V faile data.js.
"""
import io, re, sys, pathlib
from PIL import Image, ImageOps, ImageCms

ROOT = pathlib.Path(__file__).resolve().parent.parent
IMG = ROOT / 'assets' / 'img'
DATA = ROOT / 'assets' / 'js' / 'data.js'

def load(path):
    im = Image.open(path)
    icc = im.info.get('icc_profile')
    im = ImageOps.exif_transpose(im)
    if icc:
        src = ImageCms.ImageCmsProfile(io.BytesIO(icc))
        if 'srgb' not in (ImageCms.getProfileDescription(src) or '').lower():
            im = ImageCms.profileToProfile(im.convert('RGB'), src, ImageCms.createProfile('sRGB'), outputMode='RGB')
    return im.convert('RGB')

def add(src, rel):
    im = load(src); W = im.width
    widths = sorted({800 if W > 900 else W, min(1600, W)} | ({min(W, 2400)} if W >= 1900 else set()))
    main = max(w for w in widths if w <= 1600)
    for w in widths:
        r = im if w == W else im.resize((w, round(im.height * w / W)), Image.LANCZOS)
        out = IMG / (f'{rel}.jpg' if w == main else f'{rel}-{w}.jpg')
        out.parent.mkdir(parents=True, exist_ok=True)
        r.save(out, 'JPEG', quality=80, progressive=True, optimize=True)
        print(' ', out.relative_to(ROOT), f'{w}×{r.height}')

def manifest():
    man = {}
    for d in ['loc', 'scen', 'spaces', 'skc']:
        for f in sorted((IMG / d).glob('*.jpg')):
            if re.search(r'-\d{3,4}$', f.stem): continue
            ws = {Image.open(f).width}
            for v in (IMG / d).glob(f'{f.stem}-*.jpg'):
                m = re.fullmatch(re.escape(f.stem) + r'-(\d{3,4})', v.stem)
                if m: ws.add(int(m.group(1)))
            if len(ws) > 1: man[f'{d}/{f.stem}'] = sorted(ws)
    js = 'const IMGW = {\n' + ',\n'.join(f"  '{k}':[{','.join(map(str, v))}]" for k, v in man.items()) + '\n};'
    s = DATA.read_text(encoding='utf-8')
    s, n = re.subn(r'const IMGW = \{.*?\n\};', js, s, count=1, flags=re.S)
    if n != 1: raise SystemExit('data.js: IMGW nerastas')
    DATA.write_text(s, encoding='utf-8'); print(len(man), 'nuotraukų su variantais → IMGW')

if __name__ == '__main__':
    if len(sys.argv) == 4 and sys.argv[1] == 'add': add(sys.argv[2], sys.argv[3]); manifest()
    elif len(sys.argv) == 2 and sys.argv[1] == 'manifest': manifest()
    else: print(__doc__)
