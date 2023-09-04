import { readdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

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
}

export const getOptions = (options?: RunTestOptions): [Required<RunTestOptions>, string[]] => {
    const opt: Required<RunTestOptions> = Object.assign({ suffix: '.test.ts', tsNode: false }, options) as any
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

    return [opt, files];
}

export const start = (options?: RunTestOptions) => {
    const [opts, files] = getOptions(options);
    for (let file of files) require(file);
}
