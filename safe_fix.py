import os
import glob

base_dir = '/Users/admin/Desktop/istanbul-sales-agent-dashboard/XinXia/apps/web/src/app/demolar'
page_files = glob.glob(os.path.join(base_dir, '*', 'page.tsx'))

for fp in page_files:
    if 'vitrin' in fp: continue # NEVER TOUCH vitrin/page.tsx
    
    with open(fp, 'r') as f:
        lines = f.readlines()
        
    new_lines = []
    in_metadata_block = False
    for line in lines:
        if line.startswith('import type { Metadata }'):
            continue
        if line.startswith('export const metadata'):
            if '{' in line and not '}' in line:
                in_metadata_block = True
            continue
            
        if in_metadata_block:
            if '}' in line:
                in_metadata_block = False
            continue
            
        new_lines.append(line)
        
    # check if 'use client' is injected
    has_use_client = any('use client' in l for l in new_lines)
    
    if not has_use_client:
        new_lines.insert(0, "'use client';\n")
        
    with open(fp, 'w') as f:
        f.writelines(new_lines)

print("Safe metadata removal complete!")
