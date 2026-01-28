import os
import re

posts_dir = 'source/_posts'

# Regex to match YYYY-MM-DD-filename.md
# It captures the filename after the date
pattern = re.compile(r'^\d{4}-\d{2}-\d{2}-(.*\.md)$')

for filename in os.listdir(posts_dir):
    match = pattern.match(filename)
    if match:
        new_filename = match.group(1)
        old_path = os.path.join(posts_dir, filename)
        new_path = os.path.join(posts_dir, new_filename)
        
        # Check if target exists to avoid overwriting
        if os.path.exists(new_path):
            print(f"Skipping {filename} -> {new_filename} (Target exists)")
            continue
            
        print(f"Renaming {filename} -> {new_filename}")
        os.rename(old_path, new_path)

print("Renaming complete.")
