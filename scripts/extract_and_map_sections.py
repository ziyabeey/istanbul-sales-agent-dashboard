import os
import glob
import re

sections_dir = 'packages/templates/src/sections'
tsx_files = glob.glob(f'{sections_dir}/**/*.tsx', recursive=True)

print(f"Found {len(tsx_files)} TSX files.")

registry_map = {} # filename -> [(section_type, unique_key)]
for f in tsx_files:
    content = open(f).read()
    # match registerSection('hero', 'kargoagir_hero_0', ...)
    matches = re.findall(r"registerSection\s*\(\s*['\"]([^'\"]+)['\"]\s*,\s*['\"]([^'\"]+)['\"]", content)
    
    # Check if there are any registerSection( 'blog_preview' as any ...
    matches2 = re.findall(r"registerSection\s*\(\s*['\"]([^'\"]+)['\"]\s*as\s+any\s*,\s*['\"]([^'\"]+)['\"]", content)
    
    all_matches = matches + matches2
    
    rel_path = f.replace('packages/templates/src/', './').replace('.tsx', '')
    
    if all_matches:
        registry_map[rel_path] = all_matches

# Output some stats
print(f"Files with registerSection: {len(registry_map)}")

# Generate the exports file
exports_lines = ["// AUTO-GENERATED EXPORTS"]
for rel_path in sorted(registry_map.keys()):
    exports_lines.append(f"import '{rel_path}'")

with open('packages/templates/src/exports-configs-sections.ts', 'w') as f:
    f.write("\n".join(exports_lines))
    
print("Wrote exports-configs-sections.ts")

# Now let's print some of the registry keys to see how to map them to the 200 themes.
sample_keys = [v[0][1] for v in list(registry_map.values())[:10]]
print("Sample keys:", sample_keys)
