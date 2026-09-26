import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import ts from 'typescript'

const sourcePattern = /\.(?:[cm]?[jt]sx?)$/i
const assetPattern = /\.(?:css|scss|sass|less|svg|png|jpe?g|gif|webp|avif|ico|woff2?|ttf|otf)$/i
const ownedImport = /^(?:\.{1,2}\/|@\/|@kepenk\/|@xinxia\/)/

function sourceFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))
    .flatMap(entry => {
      const filename = path.join(directory, entry.name)
      if (entry.isDirectory()) return sourceFiles(filename)
      return entry.isFile() && sourcePattern.test(entry.name) && !/\.d\.[cm]?ts$/i.test(entry.name) ? [filename] : []
    })
}

/** Direct project-code imports only. Does not prove exports, transitive bundling or UI behavior. */
export function checkDemoImports({ repoRoot }) {
  const webRoot = path.resolve(repoRoot, 'apps/web')
  const configFile = path.join(webRoot, 'tsconfig.json')
  const config = ts.readConfigFile(configFile, ts.sys.readFile)
  if (config.error) throw new Error(ts.flattenDiagnosticMessageText(config.error.messageText, '\n'))
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, webRoot)
  if (parsed.errors.length) {
    throw new Error(ts.formatDiagnostics(parsed.errors, {
      getCanonicalFileName: filename => filename,
      getCurrentDirectory: () => webRoot,
      getNewLine: () => '\n',
    }))
  }
  const files = sourceFiles(path.join(webRoot, 'src/app/demolar'))
  assert.ok(files.length > 0, 'No demo source files were checked')
  const cache = ts.createModuleResolutionCache(webRoot, filename => filename, parsed.options)
  const unresolved = []
  let importsChecked = 0
  for (const filename of files) {
    const text = fs.readFileSync(filename, 'utf8')
    const source = ts.createSourceFile(filename, text, ts.ScriptTarget.Latest, true)
    // TypeScript's scanner ignores strings/comments and includes literal dynamic imports and require().
    for (const reference of ts.preProcessFile(text, true, true).importedFiles) {
      if (!ownedImport.test(reference.fileName) || assetPattern.test(reference.fileName)) continue
      importsChecked += 1
      const result = ts.resolveModuleName(reference.fileName, filename, parsed.options, ts.sys, cache)
      if (!result.resolvedModule) {
        unresolved.push({
          file: path.relative(repoRoot, filename).split(path.sep).join('/'),
          line: source.getLineAndCharacterOfPosition(reference.pos).line + 1,
          specifier: reference.fileName,
        })
      }
    }
  }
  return { filesChecked: files.length, importsChecked, unresolved }
}

export function assertDemoImports(report) {
  assert.equal(report.unresolved.length, 0,
    `Unresolved demo project imports (${report.unresolved.length}):\n`
    + report.unresolved.map(item => `${item.file}:${item.line} -> ${item.specifier}`).join('\n'))
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  try {
    const repoRoot = fileURLToPath(new URL('..', import.meta.url))
    const report = checkDemoImports({ repoRoot })
    console.log(JSON.stringify(report, null, 2))
    assertDemoImports(report)
  } catch (error) {
    console.error(`[demo-imports] ${error instanceof Error ? error.message : String(error)}`)
    process.exitCode = 1
  }
}
