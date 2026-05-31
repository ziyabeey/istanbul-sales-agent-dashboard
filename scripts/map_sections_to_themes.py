import os
import glob
import re

sections_dir = 'packages/templates/src/sections'
tsx_files = glob.glob(f'{sections_dir}/**/*.tsx', recursive=True)

registry_map = {} # filename -> list of unique_keys (in order)
file_to_keys = {}

for f in tsx_files:
    content = open(f).read()
    # match registerSection('hero', 'kargoagir_hero_0', ...)
    matches = re.findall(r"registerSection\s*\(\s*['\"]([^'\"]+)['\"]\s*,\s*['\"]([^'\"]+)['\"]", content)
    matches2 = re.findall(r"registerSection\s*\(\s*['\"]([^'\"]+)['\"]\s*as\s+any\s*,\s*['\"]([^'\"]+)['\"]", content)
    all_matches = matches + matches2
    
    basename = os.path.basename(f).replace('.tsx', '')
    
    if all_matches:
        # We need the section_type and unique_key
        # output array of strings: "section_type::unique_key"
        mapped_keys = [f"{m[0]}::{m[1]}" for m in all_matches]
        file_to_keys[basename] = mapped_keys

# print mapping count
print(f"Loaded keys for {len(file_to_keys)} component files")

# Now let's try to update the theme config files.
themes_files = [
    'packages/templates/src/themes/extended-sector-themes.ts',
    'packages/templates/src/themes/p0-themes.ts',
    'packages/templates/src/themes/p1-themes.ts',
    'packages/templates/src/themes/p2p3-themes.ts'
]

def to_camel_case(s):
    # kargo-agir -> KargoAgir
    return ''.join(word.capitalize() for word in s.split('-'))

updated_count = 0

for tf in themes_files:
    content = open(tf).read()
    
    # We will regex match the theme definition block:
    # id: 'kargo-agir',
    # ...
    # homeSections: ['...', '...'],
    
    def replacer(match):
        global updated_count
        full_match = match.group(0)
        theme_id = match.group(1) # e.g. kargo-agir
        
        # Determine the target filename
        # Theme ID format: {sector}-{variant} or just {sector}
        if '-' in theme_id:
            parts = theme_id.split('-')
            target_filename = ''.join(p.capitalize() for p in parts) + 'Sections'
        else:
            target_filename = theme_id.capitalize() + 'Sections'
            
        # some fallbacks
        fallbacks = [
            target_filename,
            theme_id.capitalize() + 'BespokeSections',
            theme_id.split('-')[0].capitalize() + 'BespokeSections'
        ]
        
        matched_keys = None
        for fb in fallbacks:
            if fb in file_to_keys:
                matched_keys = file_to_keys[fb]
                break
                
        if matched_keys:
            # Replace homeSections
            # Format the array
            keys_str = ", ".join(f"'{k}'" for k in matched_keys)
            new_home_sections = f"homeSections: [{keys_str}]"
            
            # replace the homeSections line
            new_full_match = re.sub(r"homeSections:\s*\[.*?\]", new_home_sections, full_match, flags=re.DOTALL)
            
            if new_full_match != full_match:
                updated_count += 1
            return new_full_match
        else:
            print(f"Warning: Could not find sections for theme {theme_id} (tried {fallbacks})")
            return full_match

    # A regex to match an object block that contains id: '...' and homeSections: [...]
    # Note: Regex parsing JSON-like structures can be tricky, but we can do a localized match.
    # We look for `id: 'some-id',` then anything up to `homeSections: [...]`
    # We will use a more robust regex.
    new_content = re.sub(r"id:\s*['\"]([^'\"]+)['\"].*?homeSections:\s*\[.*?\]", replacer, content, flags=re.DOTALL)
    
    if new_content != content:
        with open(tf, 'w') as f:
            f.write(new_content)
        print(f"Updated {tf}")

print(f"Total themes mapped: {updated_count}")
