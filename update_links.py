import os
import re

posts_dir = 'source/_posts'

# Regex for markdown image links
# Matches ![](images/filename)
img_pattern = re.compile(r'!\[(.*?)\]\(images/(.*?)\)')

# Regex for coverImage
# Matches coverImage: "filename" or coverImage: filename
cover_pattern = re.compile(r'^coverImage:\s*["\']?(.*?)["\']?\s*$')

for filename in os.listdir(posts_dir):
    if not filename.endswith('.md'):
        continue
    
    filepath = os.path.join(posts_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    new_lines = []
    modified = False
    
    for line in lines:
        # Update markdown image links
        if '](images/' in line:
            new_line = img_pattern.sub(r'![\1](/images/\2)', line)
            if new_line != line:
                line = new_line
                modified = True
        
        # Update coverImage
        if line.strip().startswith('coverImage:'):
            match = cover_pattern.match(line)
            if match:
                current_val = match.group(1)
                # If it doesn't already start with /, http, or images/
                if not current_val.startswith('/') and not current_val.startswith('http'):
                     # If it starts with images/, replace it, otherwise prepend /images/
                    if current_val.startswith('images/'):
                        new_val = '/' + current_val
                    else:
                        new_val = '/images/' + current_val
                    
                    line = f'coverImage: "{new_val}"\n'
                    modified = True

        new_lines.append(line)
    
    if modified:
        print(f'Updating {filename}')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)

print("Link update complete.")
