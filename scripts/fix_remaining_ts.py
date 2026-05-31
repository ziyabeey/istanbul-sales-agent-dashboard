import os
import glob
import re

sections_dir = 'packages/templates/src/sections'
tsx_files = glob.glob(f'{sections_dir}/**/*.tsx', recursive=True)

for path in tsx_files:
    with open(path, 'r') as f:
        content = f.read()
        
    new_content = content
    
    # 1. Parameter implicitly has an 'any' type
    new_content = re.sub(r"\(service, i\)", "(service: any, i: number)", new_content)
    new_content = re.sub(r"\(service, idx\)", "(service: any, idx: number)", new_content)
    new_content = re.sub(r"\(member, i\)", "(member: any, i: number)", new_content)
    new_content = re.sub(r"\(member, idx\)", "(member: any, idx: number)", new_content)
    new_content = re.sub(r"\(w, wh, idx\)", "(w: any, wh: any, idx: number)", new_content)
    
    # 2. property does not exist on type '{}'
    new_content = new_content.replace("content?.properties", "(content as any)?.properties")
    new_content = new_content.replace("content?.projects", "(content as any)?.projects")
    
    # 3. ReactNode error for slogan/ownerName/etc.
    new_content = new_content.replace("{businessData.ownerName}", "{businessData?.ownerName as string}")
    new_content = new_content.replace("{business?.ownerName}", "{business?.ownerName as string}")
    
    # 4. React.cloneElement TS2769
    new_content = new_content.replace("React.cloneElement(activity.icon as React.ReactElement", "React.cloneElement(activity.icon as any")
    new_content = new_content.replace("React.cloneElement(item.icon as React.ReactElement", "React.cloneElement(item.icon as any")
    new_content = new_content.replace("React.cloneElement(stat.icon as React.ReactElement", "React.cloneElement(stat.icon as any")
    
    # 5. cambalkon transition value error
    new_content = new_content.replace('ease: "easeOut"', 'ease: "easeOut" as any')
    
    if new_content != content:
        with open(path, 'w') as f:
            f.write(new_content)
        print(f"Fixed TS issues in {path}")
