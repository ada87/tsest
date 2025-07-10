import { readdirSync, existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { run } from 'node:test';
import { EOL, cpus } from 'node:os'
import { colorGray, colorRed, colorGreen, tipError, } from './color';


type ExtractRunOptions<T> = T extends (options?: infer R) => any ? R : never;
type RunOptions = ExtractRunOptions<typeof run>;

export type TestOptions = Pick<RunOptions, 'watch' | 'only' | 'forceExit' | 'timeout' | 'concurrency'> & {
    root: string
    fileSuffix: string
    globPatterns?: RegExp
    testNamePatterns?: RegExp
    testSkipPatterns?: RegExp
}

const DEFAULT_ARGS = [...process.argv, ...process.execArgv];

/**
 * 检测 TypeScript 运行环境
 * 支持 ts-node, tsx, --experimental-strip-types 等各种场景
 */
const detectTypeScriptEnvironment = () => {
    const { argv, execArgv } = process;
    
    // 检查是否直接使用 ts-node 或 tsx 执行
    const executable = argv[0];
    if (executable.includes('ts-node') || executable.includes('tsx')) {
        return { isTS: true, isESM: false };
    }
    
    // 检查 execArgv 中的 TypeScript 相关标志
    const patterns = [
        // --experimental-strip-types
        /^--experimental-strip-types$/,
        // ts-node 相关
        /^ts-node\/register$/,
        /^ts-node\/esm$/,
        // tsx 相关
        /^tsx\/esm$/,
        /^tsx\/cjs$/,
        /tsx\/dist\/loader\.mjs$/,
        /tsx\/dist\/preflight\.cjs$/,
    ];
    
    const tsFlags = execArgv.filter(arg => 
        patterns.some(pattern => pattern.test(arg))
    );
    
    const isTS = tsFlags.length > 0;
    const isESM = tsFlags.some(flag => 
        flag.includes('/esm') || flag.includes('/loader.mjs')
    );
    
    return { isTS, isESM };
};

const { isTS: IS_TS, isESM: IS_ESM } = detectTypeScriptEnvironment();

// 检查是否有 --strict 标志
if (DEFAULT_ARGS.includes('--strict')) process.env.TSEST_STRICT = 'true'

const toPattern = (value: string): TestOptions['testNamePatterns'] => {
    let txt = value;
    if (value.startsWith('"') && value.endsWith('"')) {
        txt = value.substring(1, value.length - 1);
    }
    if (txt.length == 0) return undefined;
    try {
        const reg = new RegExp(txt);
        return reg
    } catch {
        console.log('Invalid pattern : ' + txt)
        return undefined;
    }
}

const parseArg = (options: TestOptions, param: string) => {
    let idx = param.indexOf('=');
    const label = idx > 0 ? param.substring(0, idx) : param;
    const value = idx > 0 ? param.substring(idx + 1).trim() : '';

    switch (label) {
        case '--watch':
            options.watch = value === 'false' ? false : true;
            return;
        case '--test-only':
        case '--testOnly':
            options.only = value === 'false' ? false : true;
            return;
        case '--force-exit':
            options.forceExit = value === 'false' ? false : true;
            return;
        case '--timeout':
            const timeout = parseInt(value);
            if (isNaN(timeout) || timeout <= 0) return
            options.timeout = timeout;
            return;
        case '--test-name-pattern':
        case '--name-pattern':
        case '--namePattern':
            options.testNamePatterns = toPattern(value);
            return;
        case '--test-skip-pattern':
        case '--skip-pattern':
        case '--skipPattern':
            options.testSkipPatterns = toPattern(value);
            return;
        case '--test-file-pattern':
        case '--test-file-name':
        case '--file-name':
        case '--fileName':
            options.globPatterns = toPattern(value);
            return;
        case '--test-file-suffix':
        case '--file-suffix':
        case '--fileSuffix':
            if (value.length > 0) options.fileSuffix = value;
            return;
        case '--test-concurrency':
        case '--concurrency':
            if (value == '' || value == 'true') {
                options.concurrency = true;
                return
            }
            const num = parseInt(value);
            if (isNaN(num) || num < 1) return;
            const max = cpus().length;
            if (num <= max) {
                options.concurrency = num;
            }
            return max;
        case '--root':
            // let path = value;
            if (value == '') return;
            let root = resolve(value);
            if (!existsSync(root)) {
                tipError(`Root path not found : `, root);
                process.exit(0);
            }
            const stats = statSync(root);
            if (!stats.isDirectory()) {
                tipError(`Root path is not a directory: `, root);
                process.exit(0);
            }
            options.root = root;
            return;
    }
}


export function getTestOptions(args: string[] = DEFAULT_ARGS): TestOptions {
    const options = { fileSuffix: IS_TS ? '.test.ts' : '.test.js', } as TestOptions;
    for (let cmd of args) parseArg(options, cmd)
    if (options.root == null) options.root = existsSync(resolve('./src')) ? resolve('./src') : resolve('./');
    return options;
}


const getTestFiles = (options: TestOptions): string[] => {
    const { root, globPatterns, fileSuffix } = options;
    const files: string[] = [];
    const processDirectory = (dir: string) => {
        const dirEntries = readdirSync(dir, { withFileTypes: true });
        for (const entry of dirEntries) {
            const fullPath = resolve(dir, entry.name);
            if (entry.isDirectory()) {
                if (entry.name == 'node_modules') continue;
                processDirectory(fullPath);
            } else if (entry.isFile() && entry.name.endsWith(fileSuffix)) {
                if (!globPatterns || globPatterns.test(entry.name)) {
                    files.push(fullPath);
                }
            }
        }
    };

    processDirectory(root);
    return files;
}
export const getRunOptions = (options: TestOptions): RunOptions => {
    const runOptions: RunOptions = {};
    if (options.watch) runOptions.watch = options.watch;
    if (options.only) runOptions.only = options.only;
    if (options.forceExit) runOptions.forceExit = options.forceExit;
    if (options.timeout) runOptions.timeout = options.timeout;
    if (options.concurrency) runOptions.concurrency = options.concurrency;
    if (options.testNamePatterns) runOptions.testNamePatterns = options.testNamePatterns;
    if (options.testSkipPatterns) runOptions.testSkipPatterns = options.testSkipPatterns;
    runOptions.files = getTestFiles(options);
    if (runOptions.files.length == 0) {
        tipError('No test files found to run');
        process.exit(0);
    }
    return runOptions
}

const runOptions = getRunOptions(getTestOptions());

if (runOptions.watch) {
    console.log('-------- ' + colorGray('Start Watching for changes...'));
}
const TESTER = run(runOptions);

TESTER.on('test:fail', (info) => {
    process.stdout.write(`❌ ${colorRed(info.name)} : ${info.details.error.message}` + EOL)
})
TESTER.on('test:pass', (info) => {
    process.stdout.write(`✅ ${colorGreen(info.name)} ${colorGray('(' + info.details.duration_ms.toFixed(4) + 'ms)')}` + EOL)
})
TESTER.on('test:stderr', (err) => {
    process.stderr.write(err.message)
})
TESTER.on('test:stdout', (info) => {
    process.stdout.write(info.message)
})
if (!runOptions.watch) {
    TESTER.on('complete', (info) => {
        // console.log(info)
        // process.stdout.write(`✅ ${colorGreen(info.name)} ${colorGray('(' + info.details.duration_ms.toFixed(4) + 'ms)')}` + EOL)
    })
}