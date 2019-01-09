import os
import re
import sys
import argparse
from progress import bar

try:
    from PIL import Image
except ImportError:
    print('Python imaging not installed\nRun "pip install Pillow" to install')
    sys.exit(1)


def img2tables(img_file, width=None, height=None) -> str:
    img = Image.open(img_file).convert('RGB')
    if height and width:
        img = img.resize((width, height), Image.ANTIALIAS)
    size_x, size_y = img.size

    html = """
    <html>
        <body bgcolor=000000>
            <table border=0 cellpadding=0 cellspacing=0>
    """
    for row in bar.ChargingBar('Running').iter(range(size_y)):
        html += '<tr height=1>'
        for col in range(size_x):
            r = img.getpixel((col, row))[0]
            g = img.getpixel((col, row))[1]
            b = img.getpixel((col, row))[2]
            html += f'<td width=1 bgcolor=#{r:02x}{g:02x}{b:02x}></td>'
        html += '</tr>'
    html += """
            </table>
        </body>
    </html>
    """

    return html


def parse_args():
    def parse_size(value):
        if not re.compile(r'[0-9]+x[0-9]+').match(value):
            raise argparse.ArgumentTypeError('Invalid resizing argument.')
        width, height, *_ = value.split('x')
        return int(width), int(height)

    parser = argparse.ArgumentParser(
        description='Convert an image file to HTML tables'
    )
    parser.add_argument(
        'image_path',
        type=str,
        help='The image file to convert.')
    parser.add_argument(
        '-r',
        metavar='size',
        dest='size',
        type=parse_size,
        help='Resize the image. Example "200x100"')
    parser.add_argument(
        '-o',
        metavar='output_path',
        dest='output_path',
        type=str,
        help='Output file name.')

    return parser.parse_args()


if __name__ == '__main__':
    args = parse_args()

    size = (None, None)
    if args.size:
        size = args.size

    print(f'Starting conversion of "{args.image_path}"')
    try:
        html = img2tables(args.image_path, *size)
    except KeyboardInterrupt:
        print('Conversion aborted.')
        sys.exit(0)

    out = os.path.splitext(args.image_path)[0] + '.html'

    if args.output_path:
        out = args.output_path
    print(f'Saving to file "{out}"')
    with open(out, "w") as f:
        f.write(html)
