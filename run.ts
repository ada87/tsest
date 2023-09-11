import { readdirSync, existsSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { EOL } from 'os'
import { run } from 'node:test';
const SIGN = '\u001b[';


const style = (msg: string, code: number[]) => SIGN + code[0] + 'm' + msg + SIGN + code[1] + 'm';
const colorRed = (msg: string) => style(msg, [31, 39]);
const colorGreen = (msg: string) => style(msg, [32, 39]);
const colorYellow = (msg: string) => style(msg, [33, 39]);
const colorGray = (msg: string) => style(msg, [90, 39]);
const bgYellow = (msg: string) => style(msg, [43, 49]);

const getString = (data: any): string => {
    switch (typeof data) {
        case 'bigint':
        case 'boolean':
        case 'number':
            return data.toString();
        case 'string':
            return data;
        case 'function':
            return data.toString();
        case 'object':
            if (data instanceof Error) {
                //                 if (data.stack) {
                //                     return `${data.name + ' : ' + bgYellow(data.message)}
                // ${data.stack}`
                //                 }
                return bgYellow(data.name + ' : ' + data.message)
            }
            return JSON.stringify(data);
        case 'symbol':
            return data.toString();
        case 'undefined':
            return 'undefined'


        default:
            return '';
    }
}

// const RunOptions = Pat
export type RunTestOptions = {
    /**
     * SourceCode root dir
     * @default './src'  if exists nor `./`
    */
    root?: string
    /**
     * Testing file name
     * @default '.test.ts'
    */
    suffix?: string;
    /**
     * Testing file name Filter
     * @default (fileName:string)=>true
    */
    filter?: (fileName: string) => boolean;
    /**
     * A number of milliseconds the test will fail after.
     * If unspecified, subtests inherit this value from their parent.
     * @default Infinity
     */
    timeout?: number

    // '--root'
    // '--testNamePatterns'
    // '--fileNamePatterns'
}





export const watch = (options?: RunTestOptions, files?: string[]) => {

    const [opt, testFiles] = files ? [options, files] as [Required<RunTestOptions>, string[]] : getOptions(options);
    if (testFiles.length == 0) {
        console.log(`${bgYellow(colorRed('   There is no file to test   '))}`);
        console.log(colorGray(`Source : `) + colorYellow(opt.root));
        console.log(colorGray(`Suffix : `) + colorYellow(opt.suffix));
        console.log(colorGray(`Filter : `) + colorYellow(opt.filter == null ? 'none' : opt.filter.toString()));
        return;
    }

    const TESTER = run({
        files: testFiles,
        watch: true,
        setup: (test) => {

        }
    });


    TESTER.on('test:fail', (info) => {
        console.log('ggggggggggggggggggggggggggggggggg')
        // console.log(info.details)
        process.stdout.write(`${colorYellow('✖')} ${colorRed(info.name)} : ${info.details.error.message}` + EOL)
    })
    TESTER.on('test:pass', (info) => {
        console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
        process.stdout.write(`${colorGray('✔')} ${colorGreen(info.name)} ${colorGray('(' + info.details.duration_ms.toFixed(4) + 'ms)')}` + EOL)
    })
    TESTER.on('test:stderr', (err) => {
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
        console.log(err)
        process.stderr.write(err.message)
    })
    TESTER.on('test:stdout', (info) => {
        console.log('ooooooooooooooooooooooooooooooo')

        process.stdout.write(info.message)
    })
}
export const start = (options?: RunTestOptions, files?: string[]) => {
    const testFiles = files ? files : getOptions(options)[1];
    for (let file of testFiles) require(file);
}

const getOptions = (options?: RunTestOptions): [Required<RunTestOptions>, string[]] => {
    const opt: Required<RunTestOptions> = Object.assign({}, options) as any
    if (opt.root == undefined) {
        if (existsSync(resolve('./src'))) {
            opt.root = resolve('./src')
        } else {
            opt.root = resolve('.');
        }
    }
    if (opt.suffix == undefined) {
        opt.suffix = process.execArgv.indexOf('ts-node/register') >= 0 ? '.test.ts' : '.test.js';
    }
    const FILTER = opt.filter instanceof Function ? opt.filter : (name: string) => true;
    const files = (readdirSync(opt.root, { recursive: true }) as string[])
        .filter(item => item.endsWith(opt.suffix))
        .filter(FILTER)
        .map(item => resolve(opt.root as string, item))
        ;

    return [opt, files];
}


const AutoStart = () => {
    if (process.argv.length < 2) return;
    const CMD = 'tsest' + sep + 'run';
    if (!(process.argv[1].endsWith(CMD) || process.argv[1].endsWith(CMD + '.js'))) return;
    // console.log('start')
    const ExecArg = new Set(process.execArgv);
    const CmdArg = new Set(process.argv);
    const runOptions: RunTestOptions = {
        suffix: ExecArg.has('ts-node/register') ? '.test.ts' : '.test.js',
    }

    for (let arg of process.argv.slice(2)) {
        if (!arg.startsWith('--')) continue;
        let idx = arg.indexOf('=');
        if (idx <= 0) continue;
        const name = arg.substring(0, idx);
        const value = arg.substring(idx + 1);
        if (value.length == 0) continue;
        switch (name.substring(2)) {
            case 'root':
                runOptions.root = value;
                continue;
            case 'timeout':
                try {
                    runOptions.timeout = parseInt(value);
                } catch (e) {
                }
                continue;
            case 'suffix':
                runOptions.suffix = value;
                continue;
            case 'testName':
                continue;
            case 'fileName':
                runOptions.filter = (name) => name.indexOf(value) >= 0;
                continue;
            default:
                continue;
        }

    }

    const [options, files] = getOptions(runOptions)
    const isWatch = CmdArg.has('--watch') || CmdArg.has('-w');
    if (isWatch) {
        watch(options, files)
        console.log('Start  Watch Mode')
    } else {
        start(options, files)
        console.log('Strat  Run Mode')
    }

}

AutoStart();