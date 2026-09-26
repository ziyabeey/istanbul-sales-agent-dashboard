import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const script = fileURLToPath(new URL('./build-cloud-run-evidence.sh', import.meta.url))

function fixture(t, dockerBody = 'echo fixture-build-ok\nexit 0') {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cloud-run-evidence-test-'))
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }))
  const root = path.join(dir, 'repo')
  const bin = path.join(dir, 'bin')
  const temp = path.join(dir, 'runner-temp')
  fs.mkdirSync(root)
  fs.mkdirSync(bin)
  fs.writeFileSync(path.join(root, 'Dockerfile'), 'FROM scratch\n')
  const git = (...args) => {
    const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' })
    assert.equal(result.status, 0, result.stderr)
    return result.stdout.trim()
  }
  git('init', '-q')
  git('config', 'user.email', 'fixture@example.invalid')
  git('config', 'user.name', 'Fixture')
  git('add', 'Dockerfile')
  git('commit', '-qm', 'fixture')
  const sha = git('rev-parse', 'HEAD')
  const argsFile = path.join(dir, 'docker-args.json')
  fs.writeFileSync(path.join(bin, 'docker'), `#!/usr/bin/env bash\nset -eu\nprintf '%s\\n' "$@" > "$DOCKER_ARGS_FILE"\n${dockerBody}\n`, { mode: 0o755 })
  const env = {
    ...process.env,
    PATH: `${bin}${path.delimiter}${process.env.PATH}`,
    RUNNER_TEMP: temp,
    GITHUB_SHA: sha,
    GITHUB_RUN_ID: 'fixture-run',
    GITHUB_RUN_ATTEMPT: '1',
    CLOUD_RUN_SOURCE_SHA: 'fixture-source-sha',
    DOCKER_ARGS_FILE: argsFile,
  }
  const run = (overrides = {}) => spawnSync('bash', [script, `kepenk-cloudrun-smoke:${sha}`], {
    cwd: root, env: { ...env, ...overrides }, encoding: 'utf8', timeout: 10000,
  })
  const evidence = path.join(temp, 'cloud-run-build-evidence')
  return { root, temp, evidence, sha, argsFile, run, git }
}

test('preserves success and the exact image tag and build context', t => {
  const f = fixture(t)
  const result = f.run()
  assert.equal(result.status, 0, result.stderr)
  assert.equal(fs.readFileSync(path.join(f.evidence, 'exit-code.txt'), 'utf8'), '0\n')
  assert.deepEqual(fs.readFileSync(f.argsFile, 'utf8').trim().split('\n'), [
    'build', '--progress=plain', '-t', `kepenk-cloudrun-smoke:${f.sha}`, '.',
  ])
  assert.match(result.stdout, /fixture-build-ok/)
})

test('preserves a nonzero Docker status and captures stderr', t => {
  const f = fixture(t, 'echo "Error: fixture failure" >&2\nexit 42')
  const result = f.run()
  assert.equal(result.status, 42, result.stderr)
  assert.equal(fs.readFileSync(path.join(f.evidence, 'exit-code.txt'), 'utf8'), '42\n')
  assert.match(fs.readFileSync(path.join(f.evidence, 'build.log'), 'utf8'), /fixture failure/)
  assert.match(result.stdout, /build_exit_code=42/)
})

test('keeps the complete large log outside the checkout and bounds console output', t => {
  const f = fixture(t, 'echo "Error: first diagnostic"\nfor i in $(seq 1 30000); do echo "fixture repeated build output line $i"; done\necho "final diagnostic"\nexit 17')
  const result = f.run()
  assert.equal(result.status, 17, result.stderr)
  assert.ok(fs.statSync(path.join(f.evidence, 'build.log')).size > 1000000)
  assert.ok(Buffer.byteLength(result.stdout) < 30000)
  assert.match(result.stdout, /first diagnostic/)
  assert.match(result.stdout, /final diagnostic/)
  assert.equal(f.git('status', '--porcelain'), '')
})

test('bounds one extremely long line as well as ordinary line counts', t => {
  const f = fixture(t, 'printf "Error: "\nhead -c 1000000 /dev/zero | tr "\\0" x\nprintf "\\nlast line\\n"\nexit 19')
  const result = f.run()
  assert.equal(result.status, 19, result.stderr)
  assert.ok(Buffer.byteLength(result.stdout) < 30000)
  assert.match(result.stdout, /last line/)
})

test('records checkout, source, tree and exact tracked blob identities', t => {
  const f = fixture(t)
  assert.equal(f.run().status, 0)
  const provenance = fs.readFileSync(path.join(f.evidence, 'provenance.txt'), 'utf8')
  assert.ok(provenance.includes(`checkout_sha=${f.sha}`))
  assert.match(provenance, /source_sha=fixture-source-sha/)
  assert.match(provenance, /tree [0-9a-f]{40}/)
  assert.ok(provenance.includes(f.git('hash-object', 'Dockerfile')))
})

test('rejects a checkout mismatch before invoking Docker', t => {
  const f = fixture(t)
  const result = f.run({ GITHUB_SHA: 'a'.repeat(40) })
  assert.equal(result.status, 65)
  assert.match(result.stderr, /Checkout mismatch/)
  assert.equal(fs.existsSync(f.argsFile), false)
})

test('rejects modified tracked build inputs before invoking Docker', t => {
  const f = fixture(t)
  fs.appendFileSync(path.join(f.root, 'Dockerfile'), '# changed\n')
  const result = f.run()
  assert.equal(result.status, 65)
  assert.match(result.stderr, /dirty checkout/)
  assert.equal(fs.existsSync(f.argsFile), false)
})

test('rejects untracked build context files before invoking Docker', t => {
  const f = fixture(t)
  fs.writeFileSync(path.join(f.root, 'unexpected.txt'), 'fixture')
  assert.equal(f.run().status, 65)
  assert.equal(fs.existsSync(f.argsFile), false)
})

test('rejects an evidence directory inside the Docker build context', t => {
  const f = fixture(t)
  const result = f.run({ RUNNER_TEMP: f.root })
  assert.equal(result.status, 65)
  assert.match(result.stderr, /outside the Docker build context/)
  assert.equal(fs.existsSync(f.argsFile), false)
})

test('requires an explicit tested checkout and external temporary directory', t => {
  const f = fixture(t)
  assert.notEqual(f.run({ GITHUB_SHA: '' }).status, 0)
  assert.notEqual(f.run({ RUNNER_TEMP: '' }).status, 0)
  assert.equal(fs.existsSync(f.argsFile), false)
})

test('prefixes workflow command-looking build output', t => {
  const f = fixture(t, 'echo "::error::fixture text, not a workflow command"\necho "::set-output name=example::fixture"\nexit 0')
  const result = f.run()
  assert.equal(result.status, 0, result.stderr)
  assert.doesNotMatch(result.stdout, /^::/m)
  assert.ok(result.stdout.trimEnd().split('\n').every(line => line.startsWith(' | ')))
})

test('missing Docker fails closed and leaves readable evidence', t => {
  const f = fixture(t, 'echo "docker unavailable fixture" >&2\nexit 127')
  const result = f.run()
  assert.equal(result.status, 127)
  assert.match(result.stdout, /docker unavailable fixture/)
})

test('CI executes these regressions before the unchanged hard container gates', () => {
  const workflow = fs.readFileSync(new URL('../.github/workflows/ci.yml', import.meta.url), 'utf8')
  assert.match(workflow, /node --test scripts\/smoke-cloud-run-assets\.test\.mjs scripts\/build-cloud-run-evidence\.test\.mjs/)
  const job = workflow.split('  cloud-run-container-smoke:')[1]
  assert.ok(job)
  assert.match(job, /run: bash scripts\/build-cloud-run-evidence\.sh "kepenk-cloudrun-smoke:\$\{\{ github\.sha \}\}"/)
  assert.doesNotMatch(job, /continue-on-error/)
  assert.match(job, /name: Probe health endpoint/)
  assert.match(job, /node --input-type=module - < scripts\/smoke-cloud-run-assets\.mjs/)
})

test('CI preserves evidence outside the checkout on success or failure', () => {
  const workflow = fs.readFileSync(new URL('../.github/workflows/ci.yml', import.meta.url), 'utf8')
  const job = workflow.split('  cloud-run-container-smoke:')[1]
  assert.match(job, /name: Preserve Cloud Run build evidence\n        if: always\(\)/)
  assert.match(job, /path: \$\{\{ runner\.temp \}\}\/cloud-run-build-evidence\//)
  assert.match(job, /retention-days: 3/)
  assert.ok(job.indexOf('Build Cloud Run image') < job.indexOf('Preserve Cloud Run build evidence'))
  assert.ok(job.indexOf('Preserve Cloud Run build evidence') < job.indexOf('Start Cloud Run image'))
})
