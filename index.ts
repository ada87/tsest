export * from './test';
export * from './assert';

const print = (data: any): string => {
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
                if (data.stack) {
                    return `${data.name} : ${data.message}
${data.stack}`
                }
                return `${data.name} : ${data.message}`
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

export const console = {
    log: (message: any) => {
        process.stdout.write(print(message), 'utf-8')
    },
    error: (message: any) => {
        process.stderr.write(print(message), 'utf8');
    }

}