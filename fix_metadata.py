import os
import glob
import re

base_dir = '/Users/admin/Desktop/istanbul-sales-agent-dashboard/XinXia/apps/web/src/app/demolar'
page_files = glob.glob(os.path.join(base_dir, '*', 'page.tsx'))

fixed_count = 0
for file_path in page_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove metadata exports to allow 'use client'
    if 'export const metadata' in content or 'import type { Metadata }' in content:
        content = re.sub(r'import type \{ Metadata \} from \'next\'\n?', '', content)
        content = re.sub(r'export const metadata: Metadata = \{[^}]+\}\n?', '', content)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        fixed_count += 1

print(f"Fixed {fixed_count} page.tsx files by removing metadata.")
