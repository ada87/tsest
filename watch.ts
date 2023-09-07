import { EOL } from 'os'
import { run } from 'node:test';
import { getOptions } from './start'
import type { RunTestOptions } from './start';


const SIGN = '\u001b[';
const style = (msg: string, code: number[]) => SIGN + code[0] + 'm' + msg + SIGN + code[1] + 'm';
export const colorRed = (msg: string) => style(msg, [31, 39]);
export const colorGreen = (msg: string) => style(msg, [32, 39]);
export const colorYellow = (msg: string) => style(msg, [33, 39]);
export const colorGray = (msg: string) => style(msg, [90, 39]);
export const bgYellow = (msg: string) => style(msg, [43, 49]);


export const watch = (options?: RunTestOptions) => {
    const [opt, files] = getOptions(options)
    if (files.length == 0) {
        console.log(`${bgYellow(colorRed('   There is no file to test   '))}`);
        console.log(colorGray(`Source : `) + colorYellow(opt.root));
        console.log(colorGray(`Suffix : `) + colorYellow(opt.suffix));
        console.log(colorGray(`Filter : `) + colorYellow(opt.filter == null ? 'none' : opt.filter.toString()));
        return;
    }

    const TESTER = run({
        files,
        watch: true,
        setup: (test) => {
            
        }
    });


    TESTER.on('test:fail', (info) => {
        process.stdout.write(`${colorYellow('✖')} ${colorRed(info.name)} : ${colorYellow(info.details.error.message)}` + EOL)
    })
    TESTER.on('test:pass', (info) => {
        process.stdout.write(`${colorGray('✔')} ${colorGreen(info.name)} ${colorGray('(' + info.details.duration_ms.toFixed(4) + 'ms)')}` + EOL)
    })
    TESTER.on('test:stderr', (err) => {
        process.stderr.write(err.message)
    })
    TESTER.on('test:stdout', (info) => {
        process.stdout.write(info.message)
    })
}





// const print = (data: any): string => {
//     switch (typeof data) {
//         case 'bigint':
//         case 'boolean':
//         case 'number':
//             return data.toString();
//         case 'string':
//             return data;
//         case 'function':
//             return data.toString();
//         case 'object':
//             if (data instanceof Error) {
//                 if (data.stack) {
//                     return `${data.name + ' : ' + bgYellow(data.message)}
// ${data.stack}`

//                     // console.error(new Error('fdasfasd'))
//                 }
//                 return bgYellow(data.name + ' : ' + data.message)
//             }

//             return JSON.stringify(data);
//         case 'symbol':
//             return data.toString();
//         case 'undefined':
//             return 'undefined'


//         default:
//             return '';
//     }
// }

// export const CONSOLE = {
//     info: (message: any) => {
//         if (TESTER == null) return;
//         // process.stdout.write(print(colorGray(message)) + '\n', 'utf8')

//         print(message).split(EOL).map(line => {
//             if (line != '') process.stdout.write(line + EOL, 'utf8')
//         })
//     },
//     log: (message: any) => {
//         if (TESTER == null) return;

//         print(message).split(EOL).map(line => {
//             if (line != '') process.stdout.write(line, 'utf8')
//         })
//     },
//     error: (message: any) => {
//         // console.log('-eeeeeeeeeeeeeeeeeerrror')
//         console.log(parentPort)
//         console.log(isMainThread)
//         if (TESTER == null) return;

//         // console.log(EOL == '\r\n');
//         const needReSplit = EOL == '\r\n';
//         print(message).split(EOL).map(line => {
//             if (needReSplit) {
//                 // globalThis.console.error(' -------line --- ', line)
//                 // process.stdin.write(line + '\n', 'utf8')
//                 TESTER.emit('test:stdout', line + '\n')
//                 // line.split('\n').map(line=>{
//                 // process.stderr.write(line + '\n', 'utf8')
//                 // })
//             }
//             // console.log(' ---------- ',line)
//             // globalThis.console.log(' -------line --- ', line)
//             // if (line != '') {
//             //     process.stderr.write(line + EOL, 'utf8')
//             // }
//         })
//         // process.stderr.write(print(message) + '\n', 'utf8');
//     }

// }