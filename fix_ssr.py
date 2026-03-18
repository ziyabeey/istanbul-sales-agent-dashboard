import os
import glob

base_dir = '/Users/admin/Desktop/istanbul-sales-agent-dashboard/XinXia/apps/web/src/app/demolar'
page_files = glob.glob(os.path.join(base_dir, '*', 'page.tsx'))

fixed_count = 0
for file_path in page_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '{ ssr: false }' in content and "'use client'" not in content:
        new_content = "'use client';\n" + content
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        fixed_count += 1

print(f"Fixed {fixed_count} page.tsx files by adding 'use client'.")
