import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

describe('Theme Map Registry Validation Guard', () => {
  it('ensures all imported paths in theme-map.ts physically exist on disk', () => {
    // Resolve paths relative to the monorepo workspace root
    const themeMapPath = path.resolve(__dirname, '../../../../packages/templates/src/registry/theme-map.ts')
    expect(fs.existsSync(themeMapPath)).toBe(true)

    const registryDir = path.dirname(themeMapPath)
    const content = fs.readFileSync(themeMapPath, 'utf-8')

    // Regex to match imports, e.g. import('../themes/configs/_archive/001-asansor-bina')
    const importRegex = /'[^']+':\s*\(\)\s*=>\s*import\('([^']+)'\)/g
    let match
    const missingTargets: string[] = []

    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1]
      const resolvedPath = path.resolve(registryDir, importPath)

      // A target exists if it is a TS file, TSX file, or a folder with index.ts/index.tsx
      const possiblePaths = [
        resolvedPath,
        resolvedPath + '.ts',
        resolvedPath + '.tsx',
        path.join(resolvedPath, 'index.ts'),
        path.join(resolvedPath, 'index.tsx'),
      ]

      const exists = possiblePaths.some(p => fs.existsSync(p))
      if (!exists) {
        missingTargets.push(importPath)
      }
    }

    // Fail the test if there are any referenced targets that are missing on disk
    expect(missingTargets).toEqual([])
  })
})
