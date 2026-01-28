import os
import re
import yaml

posts_dir = 'source/_posts'

# Keys order
keys_order = ['layout', 'title', 'date', 'tags', 'categories', 'top_img', 'cover']

def parse_frontmatter(content):
    match = re.match(r'^---\n(.*?)\n---', content, re.DOTALL)
    if match:
        fm_text = match.group(1)
        try:
            # Use PyYAML if available, but since we might not have it installed in the env the user runs,
            # we should try to do simple parsing or assume they have it (Hexo env usually has node, maybe python has yaml?)
            # Actually, let's try to just parse line by line to be safe if yaml module is missing?
            # But the user environment likely has basic python. I'll use yaml if I can import it.
            # Convert to dict
            fm = yaml.safe_load(fm_text)
            return fm, match.end()
        except ImportError:
            # Fallback simple parser if complex yaml isn't needed (lists are tricky though)
            print("PyYAML not found, using simple parsing (might fail on complex lists)")
            fm = {}
            for line in fm_text.split('\n'):
                if ':' in line:
                    k, v = line.split(':', 1)
                    fm[k.strip()] = v.strip().strip('"').strip("'")
            return fm, match.end()
    return None, 0

for filename in os.listdir(posts_dir):
    if not filename.endswith('.md'):
        continue
        
    filepath = os.path.join(posts_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract frontmatter
    fm = {}
    body = content
    
    match = re.match(r'^---\n(.*?)\n---\n(.*)', content, re.DOTALL)
    if match:
        raw_fm = match.group(1)
        body = match.group(2)
        
        # Parse YAML
        try:
            fm = yaml.safe_load(raw_fm)
        except Exception as e:
            print(f"Error parsing YAML in {filename}: {e}")
            continue
            
        if not isinstance(fm, dict):
            print(f"Invalid frontmatter in {filename}")
            continue

        # Update fields
        if 'layout' not in fm:
            fm['layout'] = 'post'
            
        if 'top_img' not in fm and 'cover' in fm:
            fm['top_img'] = fm['cover']
        
        # Ensure all keys exist with default empty values if missing
        for key in keys_order:
            if key not in fm:
                fm[key] = None

        # Ensure correct order
        new_fm_lines = ['---']
        for key in keys_order:
            # We iterate keys_order to enforce order and only include these specific keys
            # (or should we include others? The user specified these fields. Let's keep others if they exist? 
            # The prompt asked to "fill these fields complete", implies these are the important ones. 
            # I will stick to writing these keys in order. If there are extra keys in fm (like author?), 
            # I should probably preserve them? The script logic below ONLY writes keys in keys_order.
            # I should probably write extra keys too? 
            # Let's write `keys_order` first, then any other keys.
            pass
        
        # Write specific keys in order
        for key in keys_order:
            if key in fm:
                val = fm[key]
                if val is None:
                     new_fm_lines.append(f'{key}:')
                elif isinstance(val, list):
                    new_fm_lines.append(f'{key}:')
                    for item in val:
                        new_fm_lines.append(f'  - "{item}"')
                else:
                     if isinstance(val, str) and (':' in val or '#' in val):
                         new_fm_lines.append(f'{key}: "{val}"')
                     else:
                        new_fm_lines.append(f'{key}: {val}')
        
        # Write remaining keys that were not in keys_order
        for key in fm:
            if key not in keys_order:
                val = fm[key]
                if val is None:
                     new_fm_lines.append(f'{key}:')
                elif isinstance(val, list):
                    new_fm_lines.append(f'{key}:')
                    for item in val:
                        new_fm_lines.append(f'  - "{item}"')
                else:
                     if isinstance(val, str) and (':' in val or '#' in val):
                         new_fm_lines.append(f'{key}: "{val}"')
                     else:
                        new_fm_lines.append(f'{key}: {val}')
        
        new_fm_lines.append('---\n')
        
        new_content = '\n'.join(new_fm_lines) + body
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filename}")

print("Frontmatter update complete.")
