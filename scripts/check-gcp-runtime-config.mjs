import assert from 'node:assert/strict'
import fs from 'node:fs'

const CANONICAL = {
  devProject: 'cs-project-rhx8yoks',
  stagingProject: 'cs-project-ljhot8la',
  prodProject: 'cs-project-evp0ac0k',
  region: 'europe-west3',
  service: 'kepenk-web-staging',
  repository: 'kepenk',
  image: 'kepenk-web',
}

const read = path => fs.readFileSync(path, 'utf8')
const github = read('.github/workflows/ci.yml')
const depot = read('.depot/workflows/ci.yml')
const cloudbuild = read('cloudbuild.yaml')
const firebaserc = JSON.parse(read('.firebaserc'))
const devops = read('apps/web/src/data/devopsConfig.ts')

for (const [name, workflow] of [['github', github], ['depot', depot]]) {
  assert.match(workflow, new RegExp(`GCP_PROJECT: ${CANONICAL.stagingProject}`), `${name} staging project drift`)
  assert.match(workflow, new RegExp(`GCP_REGION: ${CANONICAL.region}`), `${name} staging region drift`)
  assert.match(workflow, new RegExp(`GCP_SERVICE: ${CANONICAL.service}`), `${name} service drift`)
  assert.doesNotMatch(workflow, /kepenk-api-staging|gcr\.io\/\$GCP_PROJECT\/kepenk-api/, `${name} contains retired deploy target`)
  assert.doesNotMatch(workflow, /credentials_json:\s*\$\{\{\s*secrets\.GCP_SA_KEY\s*\}\}/, `${name} reintroduced long-lived deploy key path`)
}

assert.match(cloudbuild, /test "\$PROJECT_ID" = "cs-project-ljhot8la"/, 'Cloud Build must fail closed to nonprod')
assert.match(cloudbuild, /_REGION: europe-west3/, 'Cloud Build region drift')
assert.match(cloudbuild, /_REPOSITORY: kepenk/, 'Artifact Registry repository drift')
assert.match(cloudbuild, /_IMAGE: kepenk-web/, 'image package drift')
assert.match(cloudbuild, /_SERVICE: kepenk-web-staging/, 'Cloud Run service drift')
assert.match(cloudbuild, /--no-traffic/, 'Cloud Build must deploy no-traffic')
assert.doesNotMatch(cloudbuild, /--allow-unauthenticated/, 'Cloud Build must not change service IAM to public')
assert.match(cloudbuild, /kepenk-web-runtime@\$PROJECT_ID\.iam\.gserviceaccount\.com/, 'runtime identity drift')

assert.deepEqual(firebaserc.projects ?? {}, {}, '.firebaserc must have no implicit default project')

for (const id of [CANONICAL.devProject, CANONICAL.stagingProject, CANONICAL.prodProject]) {
  assert.ok(devops.includes(id), `devopsConfig missing ${id}`)
}
assert.ok(devops.includes("gcpRegionPrimary: 'europe-west3'"), 'devopsConfig staging region drift')
assert.doesNotMatch(devops, /kepenk-ai-dev|kepenk-ai-staging|kepenk-ai-prod/, 'devopsConfig contains retired project IDs')

console.log(JSON.stringify({ status: 'passed', canonical: CANONICAL }, null, 2))
