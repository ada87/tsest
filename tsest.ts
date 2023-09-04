import { readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { run } from 'node:test';

const SIGN = '\u001b[';
const style = (msg: string, code: number[]) => SIGN + code[0] + 'm' + msg + SIGN + code[1] + 'm';
const colorRed = (msg: string) => style(msg, [31, 39]);
const colorGreen = (msg: string) => style(msg, [32, 39]);
const colorYellow = (msg: string) => style(msg, [33, 39]);
const colorGray = (msg: string) => style(msg, [90, 39]);
const bgYellow = (msg: string) => style(msg, [43, 39]);

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
     * Wating mode
     * @default false
    */
    watch?: boolean,
    /**
     * Testing file name Filter
     * @default (fileName:string)=>true
    */
    filter?: (fileName: string) => boolean;
}

export const RUN = (options?: RunTestOptions) => {
    const opt: RunTestOptions = Object.assign({
        suffix: '.test.ts',
        watch: false,
    }, options)
    // console.log(opt)

    if (opt.root == undefined) {
        if (existsSync(resolve('./src'))) {
            opt.root = resolve('./src')
        } else {
            opt.root = resolve('.');
        }
    }

    const FILTER = opt.filter instanceof Function ? opt.filter : (name: string) => true;


    const files = (readdirSync(opt.root, { recursive: true }) as string[])
        .filter(item => item.endsWith('.test.ts'))
        .filter(FILTER)
        .map(item => resolve(opt.root as string, item))
        ;

    if (files.length == 0) {
        console.log(`${bgYellow(colorRed('   There is no file to test   '))}`);
        console.log(colorGray(`Source : `) + colorYellow(opt.root));
        console.log(colorGray(`Suffix : `) + colorYellow(opt.suffix as string));
        console.log(colorGray(`Filter : `) + colorYellow(opt.filter == null ? 'none' : opt.filter.toString()));
        return;
    }
    if (opt.watch) {

        const TESTER = run({ files, watch: true, });

        TESTER.on('test:fail', (info) => {
            console.log(`${colorYellow('✖')} ${colorRed(info.name)} : ${colorYellow(info.details.error.message)}`)
        })
        TESTER.on('test:pass', (info) => {
            console.log(`${colorGray('✔')} ${colorGreen(info.name)} ${colorGray('(' + info.details.duration_ms.toFixed(4) + 'ms)')}`)
        })
        TESTER.on('test:stderr', (err) => {
            console.error(err)
        })
        TESTER.on('test:stdout', (info) => {
            console.log(info.message)
        })
    } else {
        for (let file of files) require(file);
    }

}
