from PIL import Image
import sys

def crop_edges(input_path, output_path, crop_amount=35):
    img = Image.open(input_path)
    w, h = img.size
    # Crop right and bottom
    cropped = img.crop((0, 0, w - crop_amount, h - crop_amount))
    cropped.save(output_path, "PNG")
    print(f"Saved cropped image to {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python crop_img.py <input> <output>")
        sys.exit(1)
    crop_edges(sys.argv[1], sys.argv[2])
