import { run } from 'node:test';
import { getOptions } from './start'
import type { RunTestOptions } from './start';

const SIGN = '\u001b[';
const style = (msg: string, code: number[]) => SIGN + code[0] + 'm' + msg + SIGN + code[1] + 'm';
const colorRed = (msg: string) => style(msg, [31, 39]);
const colorGreen = (msg: string) => style(msg, [32, 39]);
const colorYellow = (msg: string) => style(msg, [33, 39]);
const colorGray = (msg: string) => style(msg, [90, 39]);
const bgYellow = (msg: string) => style(msg, [43, 39]);


export const watch = (options?: RunTestOptions) => {
    const [opt, files] = getOptions(options)
    if (files.length == 0) {
        console.log(`${bgYellow(colorRed('   There is no file to test   '))}`);
        console.log(colorGray(`Source : `) + colorYellow(opt.root));
        console.log(colorGray(`Suffix : `) + colorYellow(opt.suffix));
        console.log(colorGray(`Filter : `) + colorYellow(opt.filter == null ? 'none' : opt.filter.toString()));
        return;
    }

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
}


