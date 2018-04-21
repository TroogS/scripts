import sys
try:
    from PIL import Image
except ImportError:
    print('Python imaging not installed')
    sys.exit(1)


def img2tables(img_file: str, height: int=None, width: int=None) -> str:
    img = Image.open(img_file).convert('RGB')
    if height and width:
        img = img.resize((width, height), Image.ANTIALIAS)
    sizex, sizey = img.size

    html = """<html><body bgcolor=000000><table border=0 cellpadding=0 cellspacing=0>"""

    for row in range(sizey):
        html += "<tr height=1>"
        for col in range(sizex):
            html += "<td width=1 bgcolor=#{:02x}{:02x}{:02x}></td>".format(img.getpixel((col, row))[0], img.getpixel((col, row))[1], img.getpixel((col, row))[2])
        html += "</tr>"
    html += "</table></body></html>"

    return html


if __name__ == '__main__':
    if len(sys.argv) == 3:
        html = img2tables(sys.argv[1], sys.argv[2], sys.argv[3])
    else:
        html = img2tables(sys.argv[1])
    with open(sys.argv[1] + ".html", "w") as f:
        f.write(html)
