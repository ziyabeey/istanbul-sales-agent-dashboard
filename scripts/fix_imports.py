import os
import glob

paths = glob.glob('packages/templates/src/sections/**/*.tsx', recursive=True)
count = 0
for path in paths:
    with open(path, 'r') as f:
        content = f.read()
        
    new_content = content.replace("import { registerSection, type SectionProps } from '../../registry'", "import { registerSection, type SectionProps } from '../../registry/section-registry'")
    
    # Fix the Type '{}' is not assignable to type 'ReactNode' issue
    new_content = new_content.replace("{business?.description ||", "{(business?.description as string) ||")
    new_content = new_content.replace("{content?.description || business?.description ||", "{content?.description || (business?.description as string) ||")
    new_content = new_content.replace("{business?.slogan ||", "{(business?.slogan as string) ||")
    new_content = new_content.replace("{content?.slogan || business?.slogan ||", "{content?.slogan || (business?.slogan as string) ||")
    
    # Fix the TS7053 error
    new_content = new_content.replace("content.photos?.[0]", "(content.photos as any[])?.[0]")
    new_content = new_content.replace("content?.photos?.[0]", "(content?.photos as any[])?.[0]")
    new_content = new_content.replace("business?.images?.[0]", "(business?.images as any[])?.[0]")
    new_content = new_content.replace("content.images?.[0]", "(content.images as any[])?.[0]")

    if new_content != content:
        with open(path, 'w') as f:
            f.write(new_content)
        print(f"Fixed {path}")
        count += 1

print(f"Total files fixed: {count}")
