from PIL import Image
import sys

def clear_bottom_right(input_path, output_path, rect_width=60, rect_height=60):
    img = Image.open(input_path).convert("RGBA")
    w, h = img.size
    
    transparent = (0, 0, 0, 0)
    
    for x in range(max(0, w - rect_width), w):
        for y in range(max(0, h - rect_height), h):
            img.putpixel((x, y), transparent)
            
    img.save(output_path, "PNG")
    print(f"Wiped bottom right corner of {input_path}")

if __name__ == "__main__":
    clear_bottom_right(sys.argv[1], sys.argv[2])
