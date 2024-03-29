import findPackages from "find-packages"
import { promises as fs } from "fs"

async function main() {
  // @ts-ignore
  const pkgs = await findPackages(process.cwd(), {
    includeRoot: false,
    patterns: ["packages/**", "hooks/**", "utilities/**"],
  })
  const tsupConfig = await fs.readFile("tsup.config.ts", "utf8")
  await Promise.all(
    pkgs.map((pkg: { dir: any }) => {
      return fs.writeFile(`${pkg.dir}/tsup.config.ts`, tsupConfig)
    }),
  )
}

main()
