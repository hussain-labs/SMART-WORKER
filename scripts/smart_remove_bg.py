from PIL import Image
import sys
import collections

def smart_remove_bg(input_path, output_path, tolerance=210):
    img = Image.open(input_path).convert("RGBA")
    w, h = img.size
    pixels = img.load()

    # Step 1: Create a boolean mask of "potential background pixels"
    # True means it's light enough to be the checkerboard
    mask = [[False for _ in range(h)] for _ in range(w)]
    for x in range(w):
        for y in range(h):
            r, g, b, a = pixels[x, y]
            if r > tolerance and g > tolerance and b > tolerance:
                mask[x][y] = True

    # Step 2: Find all connected components of True pixels that touch the edge
    # We will use Breadth-First Search (BFS)
    queue = collections.deque()
    visited = [[False for _ in range(h)] for _ in range(w)]

    # Add all border pixels that are True to the queue
    for x in range(w):
        if mask[x][0]:
            queue.append((x, 0))
            visited[x][0] = True
        if mask[x][h-1]:
            queue.append((x, h-1))
            visited[x][h-1] = True
            
    for y in range(1, h-1):
        if mask[0][y]:
            queue.append((0, y))
            visited[0][y] = True
        if mask[w-1][y]:
            queue.append((w-1, y))
            visited[w-1][y] = True

    # Run BFS to find all contiguous background pixels
    bg_pixels = set()
    directions = [(0,1), (0,-1), (1,0), (-1,0), (1,1), (-1,-1), (1,-1), (-1,1)]
    
    while queue:
        x, y = queue.popleft()
        bg_pixels.add((x, y))
        
        for dx, dy in directions:
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h:
                if not visited[nx][ny] and mask[nx][ny]:
                    visited[nx][ny] = True
                    queue.append((nx, ny))

    # Step 3: Make only the bg_pixels transparent
    for x, y in bg_pixels:
        r, g, b, a = pixels[x, y]
        pixels[x, y] = (r, g, b, 0)

    img.save(output_path, "PNG")
    print(f"Smart background removal saved to {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python smart_remove_bg.py <input> <output>")
        sys.exit(1)
    smart_remove_bg(sys.argv[1], sys.argv[2])
