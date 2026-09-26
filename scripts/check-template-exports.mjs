import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import ts from 'typescript'

const isTemplate = specifier => /^@kepenk\/templates(?:\/|$)/.test(specifier)
const sourcePattern = /\.[cm]?[jt]sx?$/i

function sourceFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))
    .flatMap(entry => {
      const filename = path.join(directory, entry.name)
      if (entry.isDirectory()) return sourceFiles(filename)
      return entry.isFile() && sourcePattern.test(entry.name) && !/\.d\.[cm]?ts$/i.test(entry.name) ? [filename] : []
    })
}

function templateStatements(source) {
  return source.statements.filter(node =>
    (ts.isImportDeclaration(node) || ts.isExportDeclaration(node))
    && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)
    && isTemplate(node.moduleSpecifier.text))
}

/** Checks static template imports/re-exports without evaluating application modules. */
export function checkTemplateExports({ repoRoot }) {
  const webRoot = path.resolve(repoRoot, 'apps/web')
  const templateRoot = path.resolve(repoRoot, 'packages/templates/src')
  const read = ts.readConfigFile(path.join(webRoot, 'tsconfig.json'), ts.sys.readFile)
  if (read.error) throw new Error(ts.flattenDiagnosticMessageText(read.error.messageText, '\n'))
  const parsed = ts.parseJsonConfigFileContent(read.config, ts.sys, webRoot)
  if (parsed.errors.length) throw new Error(ts.formatDiagnosticsWithColorAndContext(parsed.errors, {
    getCurrentDirectory: () => webRoot, getCanonicalFileName: name => name, getNewLine: () => '\n',
  }))
  const allFiles = sourceFiles(path.join(webRoot, 'src'))
  assert.ok(allFiles.length, 'No web source files were scanned')
  const consumers = allFiles.filter(filename => templateStatements(ts.createSourceFile(
    filename, fs.readFileSync(filename, 'utf8'), ts.ScriptTarget.Latest, true,
  )).length)
  assert.ok(consumers.length, 'No template consumers were checked')
  const templateFiles = sourceFiles(templateRoot)
  const program = ts.createProgram([...consumers, ...templateFiles], {
    ...parsed.options, noEmit: true, skipLibCheck: true, incremental: false,
  })
  const checker = program.getTypeChecker()
  const relative = filename => path.relative(repoRoot, filename).split(path.sep).join('/')
  const exported = new Map()
  const exportsOf = symbol => {
    if (!symbol) return new Map()
    if (!exported.has(symbol)) exported.set(symbol, new Map(checker.getExportsOfModule(symbol).map(item => [item.name, item])))
    return exported.get(symbol)
  }
  const target = symbol => symbol && (symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol)
  const unresolved = []
  let statementsChecked = 0
  let namesChecked = 0
  for (const filename of consumers) {
    const source = program.getSourceFile(filename)
    for (const node of templateStatements(source)) {
      statementsChecked += 1
      const module = checker.getSymbolAtLocation(node.moduleSpecifier)
      const available = exportsOf(module)
      const names = []
      if (ts.isImportDeclaration(node)) {
        if (node.importClause?.name) names.push('default')
        const bindings = node.importClause?.namedBindings
        if (bindings && ts.isNamedImports(bindings)) names.push(...bindings.elements.map(item => (item.propertyName ?? item.name).text))
      } else if (node.exportClause && ts.isNamedExports(node.exportClause)) {
        names.push(...node.exportClause.elements.map(item => (item.propertyName ?? item.name).text))
      }
      if (!module) names.push('*module*')
      for (const name of names) {
        namesChecked += 1
        if (target(available.get(name))?.declarations?.length) continue
        unresolved.push({ file: relative(filename), line: source.getLineAndCharacterOfPosition(node.getStart()).line + 1,
          specifier: node.moduleSpecifier.text, name })
      }
    }
  }
  // Suggest only real declaration owners, not another barrel forwarding the same name.
  const missingNames = new Set(unresolved.map(item => item.name))
  const providers = {}
  for (const filename of templateFiles) {
    const source = program.getSourceFile(filename)
    const module = source && checker.getSymbolAtLocation(source)
    for (const [name, symbol] of exportsOf(module)) {
      if (!missingNames.has(name)) continue
      if (!target(symbol)?.declarations?.some(declaration => declaration.getSourceFile().fileName === filename)) continue
      ;(providers[name] ??= []).push(relative(filename))
    }
  }
  // getExportsOfModule alone can pick a name from an ambiguous export-star chain.
  const barrelDiagnostics = templateFiles.filter(filename => /\/(?:index|legacy-demo-configs|exports-configs-sections)\.ts$/.test(filename))
    .flatMap(filename => program.getSemanticDiagnostics(program.getSourceFile(filename)))
    .filter(diagnostic => [2305, 2307, 2308, 2459, 2614].includes(diagnostic.code))
    .map(diagnostic => ({ file: relative(diagnostic.file.fileName),
      line: diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start ?? 0).line + 1,
      code: diagnostic.code, message: ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n') }))
  return { filesScanned: allFiles.length, consumerFiles: consumers.length, statementsChecked, namesChecked,
    unresolved: unresolved.map(item => ({ ...item, providers: providers[item.name] ?? [] })), barrelDiagnostics }
}

export function assertTemplateExports(report) {
  assert.equal(report.unresolved.length + report.barrelDiagnostics.length, 0,
    `Template export contract failed: ${report.unresolved.length} missing imports; ${report.barrelDiagnostics.length} barrel errors`)
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  try {
    const repoRoot = fileURLToPath(new URL('..', import.meta.url))
    const report = checkTemplateExports({ repoRoot })
    const output = process.argv[2]
    if (output) {
      const destination = path.resolve(output)
      assert.ok(!destination.startsWith(path.resolve(repoRoot) + path.sep), 'Write evidence outside the checkout')
      fs.mkdirSync(path.dirname(destination), { recursive: true })
      fs.writeFileSync(destination, JSON.stringify(report, null, 2) + '\n')
    }
    console.log(JSON.stringify(report, null, 2))
    assertTemplateExports(report)
  } catch (error) {
    console.error(`[template-exports] ${error instanceof Error ? error.message : String(error)}`)
    process.exitCode = 1
  }
}
