import { existsSync, readdirSync, readFileSync, writeFileSync, rmSync, copyFileSync, renameSync, } from 'fs';
import { exec } from 'child_process';
import { resolve, join, sep } from 'path';
const __dirname = process.cwd();
const distDir = resolve(__dirname, './dist')

// node --experimental-strip-types script.ts

const runCommand = (command: string) => {
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(stdout);
        });
    });
}
const CJS_MAPPING = new Map<string, string>([
    ['index.js', 'index.cjs'],
    ['index.d.ts', 'index.d.cts'],
    ['run.js', 'run.cjs'],
    ['run.d.ts', 'run.d.cts'],
    ['color.js', 'color.cjs'],
    ['color.d.ts', 'color.d.cts'],
]);

const RunBuild = async () => {
    await runCommand('tsc --module commonjs --moduleResolution node');
    const files = readdirSync(__dirname);
    for (const file of files) {
        const mapping = CJS_MAPPING.get(file);
        if (mapping) {
            renameSync(resolve(__dirname, file), resolve(__dirname, mapping));
        }
    }
    await runCommand('tsc --module ESNext --moduleResolution bundler');
    // console.log(files);
    // console.log(result);
    // await runCommand('tsc --module commonjs');


}

RunBuild()