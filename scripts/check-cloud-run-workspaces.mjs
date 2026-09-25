import fs from 'node:fs'

const webPackage = JSON.parse(fs.readFileSync('apps/web/package.json', 'utf8'))
const dockerfile = fs.readFileSync('Dockerfile', 'utf8')

const workspaceDeps = Object.entries({
  ...(webPackage.dependencies ?? {}),
  ...(webPackage.devDependencies ?? {}),
})
  .filter(([name, version]) => name.startsWith('@kepenk/') && String(version).startsWith('workspace:'))
  .map(([name]) => name)

const missing = workspaceDeps.filter((name) => {
  const packageName = name.slice('@kepenk/'.length)
  const expected = `COPY packages/${packageName}/package.json packages/${packageName}/package.json`
  return !dockerfile.includes(expected)
})

if (missing.length) {
  console.error('Cloud Run Dockerfile is missing workspace manifests required by @kepenk/web:')
  for (const name of missing) console.error(`- ${name}`)
  process.exit(1)
}

console.log(`Cloud Run workspace manifest parity OK (${workspaceDeps.length} workspace dependencies).`)
