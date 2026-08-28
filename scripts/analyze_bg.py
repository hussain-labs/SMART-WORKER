from PIL import Image
import sys
from collections import Counter

def analyze_bg(input_path):
    img = Image.open(input_path).convert("RGBA")
    w, h = img.size
    
    # Check top-left 50x50 corner (should be pure checkerboard)
    colors = []
    for x in range(50):
        for y in range(50):
            colors.append(img.getpixel((x, y)))
            
    counter = Counter(colors)
    print("Most common colors in top-left 50x50:")
    for color, count in counter.most_common(5):
        print(f"{color}: {count}")

if __name__ == "__main__":
    analyze_bg(sys.argv[1])
