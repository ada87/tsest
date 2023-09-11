import { test } from 'node:test';
import { default as assert } from 'node:assert';
/**
 * Description : 
 * Provide some shortcut method of test/assert
 * 
 *  for example of `equal`
 * 
 *              equal =  run funtion with args and execute `assert.equal(result)`
 *      `batch`Equal =  for Multi records of equal 
 *       `test`Equal =  build a test Case with funciton and spec args
 * `test``Batch`Equal =  build a test Case with Multi funciton and spec args
 * 
*/

export { test, assert };

export type FunctionArguments = any | any[];
export type FunctionReturn = any;
export type ResultCheckFunction<T> = (result: T) => boolean;


/**
 * Item Tuple : [ 0:args, 1:result ];
 * args   :    Arguments pass by test funciton
 * result :    Result of Function
*/
export type RecordByResult = [FunctionArguments, FunctionReturn];
export type RecordByCheckFunction<T = any> = [FunctionArguments, ResultCheckFunction<T>];
export type DataSetWithResult = RecordByResult[];
export type DataSetWithChecker<T = any> = RecordByCheckFunction<T>[];


type TestFn = Parameters<typeof test>[0];


export const testFn = (fn: Function, testFn: TestFn) => {
    test(`Test [${fn.name}]`, testFn);
}

const getArgRtn = (record: RecordByResult | RecordByCheckFunction): [any[], any] => {
    const [arg, rtn] = record
    if (arg instanceof Array) {
        return [arg, rtn]
    }
    return [[arg], rtn]
}


// Equal
export const equal = async (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => {
    const actual = await Promise.resolve(fn.apply(self, args));
    assert.equal(actual, expected);
}
export const equalBatch = (fn: Function, records: DataSetWithResult, self: any = null) => {
    for (let record of records) {
        const [args, expected] = getArgRtn(record);
        equal(fn, args, expected, self)
    }
}
export const testEqual = (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => test(`Test [${fn.name}]`, () => equal(fn, args, expected, self));
export const testEqualBatch = (fn: Function, records: DataSetWithResult, self: any = null) => test(`Test [${fn.name}]`, () => equalBatch(fn, records, self));

// deepEqual
export const deepEqual = async (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => {
    const actual = await Promise.resolve(fn.apply(self, args));
    assert.deepEqual(actual, expected);
}
export const deepEqualBatch = (fn: Function, records: DataSetWithResult, self: any = null) => {
    for (let record of records) {
        const [args, expected] = getArgRtn(record);
        deepEqual(fn, args, expected, self)
    }
}
export const testDeepEqual = (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => test(`Test [${fn.name}]`, () => deepEqual(fn, args, expected, self));
export const testDeepEqualBatch = (fn: Function, records: DataSetWithResult, self: any = null) => test(`Test [${fn.name}]`, () => deepEqualBatch(fn, records, self));

// strictEqual
export const strictEqual = async (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => {
    const actual = await Promise.resolve(fn.apply(self, args));
    assert.strictEqual(actual, expected);
}
export const strictEqualBatch = (fn: Function, records: DataSetWithResult, self: any = null) => {
    for (let record of records) {
        const [args, expected] = getArgRtn(record);
        strictEqual(fn, args, expected, self)
    }
}
export const testStrictEqual = (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => test(`Test [${fn.name}]`, () => strictEqual(fn, args, expected, self));
export const testStrictEqualBatch = (fn: Function, records: DataSetWithResult, self: any = null) => test(`Test [${fn.name}]`, () => strictEqualBatch(fn, records, self));




// deepStrictEqual
export const deepStrictEqual = async (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => {
    const actual = await Promise.resolve(fn.apply(self, args));
    assert.deepStrictEqual(actual, expected);
}
export const deepStrictEqualBatch = (fn: Function, records: DataSetWithResult, self: any = null) => {
    for (let record of records) {
        const [args, expected] = getArgRtn(record);
        deepStrictEqual(fn, args, expected, self)
    }
}
export const testDeepStrictEqual = (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => test(`Test [${fn.name}]`, () => deepStrictEqual(fn, args, expected, self));
export const testDeepStrictEqualBatch = (fn: Function, records: DataSetWithResult, self: any = null) => test(`Test [${fn.name}]`, () => deepStrictEqualBatch(fn, records, self));




// NotEqual
export const notEqual = async (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => {
    const actual = await Promise.resolve(fn.apply(self, args));
    assert.notEqual(actual, expected);
}
export const notEqualBatch = (fn: Function, records: DataSetWithResult, self: any = null) => {
    for (let record of records) {
        const [args, expected] = getArgRtn(record);
        notEqual(fn, args, expected, self)
    }
}
export const testNotEqual = (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => test(`Test [${fn.name}]`, () => notEqual(fn, args, expected, self));
export const testNotEqualBatch = (fn: Function, records: DataSetWithResult, self: any = null) => test(`Test [${fn.name}]`, () => notEqualBatch(fn, records, self));


// not deepEqual
export const notDeepEqual = async (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => {
    const actual = await Promise.resolve(fn.apply(self, args));
    assert.notDeepEqual(actual, expected);
}
export const notDeepEqualBatch = (fn: Function, records: DataSetWithResult, self: any = null) => {
    for (let record of records) {
        const [args, expected] = getArgRtn(record);
        notDeepEqual(fn, args, expected, self)
    }
}
export const testNotDeepEqual = (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => test(`Test [${fn.name}]`, () => notDeepEqual(fn, args, expected, self));
export const testNotDeepEqualBatch = (fn: Function, records: DataSetWithResult, self: any = null) => test(`Test [${fn.name}]`, () => notDeepEqualBatch(fn, records, self));



// notStrictEqual
export const notStrictEqual = async (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => {
    const actual = await Promise.resolve(fn.apply(self, args));
    assert.notStrictEqual(actual, expected);
}
export const notStrictEqualBatch = (fn: Function, records: DataSetWithResult, self: any = null) => {
    for (let record of records) {
        const [args, expected] = getArgRtn(record);
        notStrictEqual(fn, args, expected, self)
    }
}
export const testNotStrictEqual = (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => test(`Test [${fn.name}]`, () => notStrictEqual(fn, args, expected, self));
export const testNotStrictEqualBatch = (fn: Function, records: DataSetWithResult, self: any = null) => test(`Test [${fn.name}]`, () => notStrictEqualBatch(fn, records, self));


// notDeepStrictEqual
export const notDeepStrictEqual = async (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => {
    const actual = await Promise.resolve(fn.apply(self, args));
    assert.notDeepStrictEqual(actual, expected);
}
export const notDeepStrictEqualBatch = (fn: Function, records: DataSetWithResult, self: any = null) => {
    for (let record of records) {
        const [args, expected] = getArgRtn(record);
        notDeepStrictEqual(fn, args, expected, self)
    }
}
export const testNotDeepStrictEqual = (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => test(`Test [${fn.name}]`, () => notDeepStrictEqual(fn, args, expected, self));
export const testNotDeepStrictEqualBatch = (fn: Function, records: DataSetWithResult, self: any = null) => test(`Test [${fn.name}]`, () => notDeepStrictEqualBatch(fn, records, self));



// true/false
export const isTrue = async (fn: Function, args: FunctionArguments, self: any = null) => {
    const actual = await Promise.resolve(fn.apply(self, args));
    assert.equal(actual, true);
}
export const isTrueBatch = (fn: Function, records: FunctionArguments[], self: any = null) => {
    for (let args of records) {
        isTrue(fn, args, self)
    }
}
export const testIsTrue = (fn: Function, args: FunctionArguments, self: any = null) => test(`Test [${fn.name}]`, () => isTrue(fn, args, self));
export const testIsTrueBatch = (fn: Function, records: FunctionArguments[], self: any = null) => test(`Test [${fn.name}]`, () => isTrueBatch(fn, records, self));

export const isFalse = async (fn: Function, args: FunctionArguments, self: any = null) => {
    const actual = await Promise.resolve(fn.apply(self, args));
    assert.equal(actual, false);
}
export const isFalseBatch = (fn: Function, records: FunctionArguments[], self: any = null) => {
    for (let args of records) {
        isFalse(fn, args, self)
    }
}
export const testIsFalse = (fn: Function, args: FunctionArguments, self: any = null) => test(`Test [${fn.name}]`, () => isFalse(fn, args, self));
export const testIsFalseBatch = (fn: Function, records: FunctionArguments[], self: any = null) => test(`Test [${fn.name}]`, () => isFalseBatch(fn, records, self));



// Throw
export const throws = (fn: Function, args: FunctionArguments, self: any = null) => {
    assert.throws(() => fn.apply(self, args))
}
export const throwsBatch = (fn: Function, records: FunctionArguments[], self: any = null) => {
    for (let args of records) {
        throws(fn, args, self)
    }
}
export const testThrows = (fn: Function, args: FunctionArguments, self: any = null) => test(`Test [${fn.name}]`, () => throws(fn, args, self));
export const testThrowsBatch = (fn: Function, records: FunctionArguments[], self: any = null) => test(`Test [${fn.name}]`, () => throwsBatch(fn, records, self));

export const doesNotThrow = (fn: Function, args: FunctionArguments, self: any = null) => {
    assert.doesNotThrow(() => fn.apply(self, args))
}
export const doesNotThrowBatch = (fn: Function, records: FunctionArguments[], self: any = null) => {
    for (let args of records) {
        doesNotThrow(fn, args, self)
    }
}
export const testDoesNotThrow = (fn: Function, args: FunctionArguments, self: any = null) => test(`Test [${fn.name}]`, () => doesNotThrow(fn, args, self));
export const testDoesNotThrowBatch = (fn: Function, records: FunctionArguments[], self: any = null) => test(`Test [${fn.name}]`, () => doesNotThrowBatch(fn, records, self));

export const rejects = (fn: Function, args: FunctionArguments, self: any = null) => {
    assert.rejects(() => fn.apply(self, args))
}
export const rejectsBatch = (fn: Function, records: FunctionArguments[], self: any = null) => {
    for (let args of records) {
        rejects(fn, args, self)
    }
}
export const testRejects = (fn: Function, args: FunctionArguments, self: any = null) => test(`Test [${fn.name}]`, () => rejects(fn, args, self));
export const testRejectsBatch = (fn: Function, records: FunctionArguments[], self: any = null) => test(`Test [${fn.name}]`, () => rejectsBatch(fn, records, self));

export const doesNotReject = (fn: Function, args: FunctionArguments, self: any = null) => {
    assert.doesNotReject(() => fn.apply(self, args))
}
export const doesNotRejectBatch = (fn: Function, records: FunctionArguments[], self: any = null) => {
    for (let args of records) {
        doesNotReject(fn, args, self)
    }
}
export const testDoesNotReject = (fn: Function, args: FunctionArguments, self: any = null) => test(`Test [${fn.name}]`, () => doesNotReject(fn, args, self));
export const testDoesNotRejectBatch = (fn: Function, records: FunctionArguments[], self: any = null) => test(`Test [${fn.name}]`, () => doesNotRejectBatch(fn, records, self));


// Match
export const match = async (fn: Function, reg: RegExp, args: FunctionArguments, self: any = null) => {
    const text = await Promise.resolve(fn.apply(self, args));
    assert.match(text, reg);
}
export const matchBatch = (fn: Function, reg: RegExp, records: FunctionArguments[], self: any = null) => {
    for (let args of records) {
        match(fn, reg, args, self)
    }
}
export const testMatch = (fn: Function, reg: RegExp, args: FunctionArguments, self: any = null) => test(`Test [${fn.name}]`, () => match(fn, reg, args, self));
export const testMatchBatch = (fn: Function, reg: RegExp, records: FunctionArguments[], self: any = null) => test(`Test [${fn.name}]`, () => matchBatch(fn, reg, records, self));



export const doesNotMatch = async (fn: Function, reg: RegExp, args: FunctionArguments, self: any = null) => {
    const text = await Promise.resolve(fn.apply(self, args));
    assert.doesNotMatch(text, reg);
}
export const doesNotMatchBatch = (fn: Function, reg: RegExp, records: FunctionArguments[], self: any = null) => {
    for (let args of records) {
        doesNotMatch(fn, reg, args, self)
    }
}
export const testDoesNotMatch = (fn: Function, reg: RegExp, args: FunctionArguments, self: any = null) => test(`Test [${fn.name}]`, () => doesNotMatch(fn, reg, args, self));
export const testDoesNotMatchBatch = (fn: Function, reg: RegExp, records: FunctionArguments[], self: any = null) => test(`Test [${fn.name}]`, () => doesNotMatchBatch(fn, reg, records, self));



export const byCheckFunction = <T>(fn: (...args: any[]) => T, record: RecordByCheckFunction<T>, self: any = null) => {
    // RecordByCheckFunction<T>
    const [args, checker] = getArgRtn(record);;
    const returnValue = fn.apply(self, args);
    assert.equal(checker(returnValue), true);
}

export const byCheckFunctionBatch = <T>(fn: (...args: any[]) => T, records: DataSetWithChecker<T>, self: any = null) => {
    for (let record of records) {
        byCheckFunction(fn, record, self)
    }
}
export const testByCheckFunction = <T>(fn: (...args: any[]) => T, args: FunctionArguments, self: any = null) => test(`Test [${fn.name}]`, () => byCheckFunction(fn, args, self));
export const testByCheckFunctionBatch = <T>(fn: (...args: any[]) => T, records: DataSetWithChecker<T>, self: any = null) => test(`Test [${fn.name}]`, () => byCheckFunctionBatch(fn, records, self));


// const getString = (data: any): string => {
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
//                 //                 if (data.stack) {
//                 //                     return `${data.name + ' : ' + bgYellow(data.message)}
//                 // ${data.stack}`
//                 //                 }
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


// Custom Message , Some Bug course Not effect ,todo
// class CustomError extends AssertionError {
//     generatedMessage = false;
// }
// const ArgFunction = (fn: Function, args: FunctionArguments) => {
//     const txt: string[] = [];
//     txt.push(colorGray(fn.name));
//     txt.push(colorGreen('('))
//     if (args instanceof Array) {
//         let txtArgs: string[] = []
//         args.map(arg => {
//             txtArgs.push(colorYellow(getString(arg)));
//         })
//         txt.push(txtArgs.join(colorGray(', ')));

//     } else {
//         txt.push(colorYellow(getString(args)))
//     }

//     txt.push(colorGreen(')'))
//     return txt.join('')
// }

// const EqualMessage = (fn: Function, args: FunctionArguments, expected: any, actual: any) => {
//     const message = `${colorRed('Not Equal : ')} ${fn.name}
// ${ArgFunction(fn, args)}
// ${colorGray('Expected :')} ${getString(expected)}
// ${colorGray('  Actual :')} ${getString(actual)}
// `;
//     return message
// }
// const NotEqualMessage = (fn: Function, args: FunctionArguments, expected: any, actual: any): string => {
//     return `${colorRed('Equal : ')} ${fn.name}
// ${ArgFunction(fn, args)}
// Expected : ${getString(expected)}
// Actual   : ${getString(actual)}
// `;
// }
