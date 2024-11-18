import { access, cp, readdir, rm, writeFile } from "node:fs/promises";
import packageJson from "../package.json" with { type: 'json' };
import { join } from "node:path";
import swc from '@swc/core'

const dist = join(process.cwd(), 'dist')
const scripts = ['afterCreate.mjs', 'beforeCreate.mjs']

const buildPackageJson = structuredClone(packageJson);

buildPackageJson.type = "commonjs";
buildPackageJson.scripts = {};
buildPackageJson.devDependencies = {};
buildPackageJson.bin = {
  "stl-create": "./main.js",
};

writeFile(
  join(dist, "package.json"),
  JSON.stringify(buildPackageJson, null, 2),
);

await cp(join(process.cwd(), 'starters'), join(dist, 'starters'), { recursive: true })

const starters = await readdir(join(dist, 'starters'), { withFileTypes: true }).then(res => res.filter(r => r.isDirectory()))

for (const dirent of starters) {
  const dir = join(dirent.parentPath, dirent.name)
  
  Promise.allSettled(scripts.map(s => access(join(dir, s)))).then((res) => {
    res.forEach((r, index) => {
      if (r.status === 'rejected') return

      console.info(`found ${scripts[index]} in ${dirent.name}`)
      console.info('doing compiling with swc')

      swc.transformFile(join(dir, scripts[index]), {
        jsc: {
          target: "esnext",
          "parser": {
            syntax: "ecmascript"
          }
        }
      }).then(output => 
        Promise.allSettled([
          writeFile(join(dir, scripts[index].replace(/\.mjs/, '.js')), output.code), 
          rm(join(dir, scripts[index]), { force: true })
        ])
      )
    })
  })
}
