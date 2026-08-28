from PIL import Image
import sys

def remove_white_bg(input_path, output_path, tolerance=210):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()

    new_data = []
    for item in data:
        # Check if pixel is close to white
        # item is (R, G, B, A)
        if item[0] > tolerance and item[1] > tolerance and item[2] > tolerance:
            # Change to transparent
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Saved transparent image to {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python remove_white_bg.py <input> <output>")
        sys.exit(1)
    remove_white_bg(sys.argv[1], sys.argv[2])
