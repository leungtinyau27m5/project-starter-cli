import { join } from 'node:path'
import packageJson from '../package.json' with { type: 'json' }
import { writeFile } from 'node:fs/promises'

const dist = join(process.cwd(), 'dist')

const buildPackageJson = structuredClone(packageJson)
buildPackageJson.scripts = {
    "start": "node ./index.js"
}
buildPackageJson.devDependencies = {}
buildPackageJson.type = "commonjs"

await writeFile(join(dist, "package.json"), JSON.stringify(buildPackageJson, null, 2))