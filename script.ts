import { existsSync, readdirSync, readFileSync, renameSync, rmSync, writeFileSync, } from 'fs';
import { exec } from 'child_process';
import { resolve } from 'path';


const __dirname = process.cwd();

const runCommand = (command: string) => new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
        if (err) {
            reject(err);
            return;
        }
        resolve(stdout);
    });
});

const CJS_MAPPING = new Map<string, string>([
    ['index.js', 'index.cjs'],
    ['run.js', 'run-cjs.js'],
    ['color.js', 'color.cjs'],
]);

// const reImport = () => {
//     const cjsRunPath = resolve(__dirname, 'run.cjs');
//     const cjsIdxPath = resolve(__dirname, 'index.cjs');

//     const esmRunPath = resolve(__dirname, 'run.js');
//     const esmIdxPath = resolve(__dirname, 'index.js');

//     if (!existsSync(cjsRunPath) || !existsSync(esmRunPath) || !existsSync(cjsIdxPath) || !existsSync(esmIdxPath)) throw ('File not found');


//     const cjsRunContent = readFileSync(cjsRunPath, 'utf-8').replace('"./color"', '"./color.cjs"');
//     writeFileSync(cjsRunPath, cjsRunContent, 'utf-8');
//     const cjsIdxContent = readFileSync(cjsIdxPath, 'utf-8').replace('"./color"', '"./color.cjs"');
//     writeFileSync(cjsIdxPath, cjsIdxContent, 'utf-8');


//     const esmRunContent = readFileSync(esmRunPath, 'utf-8').replace("'./color'", "'./color.js'");
//     writeFileSync(esmRunPath, esmRunContent, 'utf-8');
//     const esmIdxContent = readFileSync(esmIdxPath, 'utf-8').replace("'./color'", "'./color.js'");
//     writeFileSync(esmIdxPath, esmIdxContent, 'utf-8');
// }


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

    // reImport();
}

const RunClean = () => {
    const files = readdirSync(__dirname);
    for (const file of files) {
        if (file.endsWith('.d.cts') || file.endsWith('.cjs') || file.endsWith('.d.ts') || file.endsWith('.js')) {
            rmSync(resolve(__dirname, file));
            // console.log(file)
        }
    }
}
// tsx script.ts
RunClean();
RunBuild()