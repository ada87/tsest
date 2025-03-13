import { test } from 'node:test';
import { colorYellow, colorGray, colorGreen, styleItalic, styleBold } from './color';
import { default as easy, strict } from 'node:assert';


const nodeAssert = process.env.TSEST_STRICT === 'true' ? strict : easy;

export { test };

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


const getArgRtn = (record: RecordByResult | RecordByCheckFunction): [any[], any] => {
    const [arg, rtn] = record
    if (arg instanceof Array) {
        return [arg, rtn]
    }
    return [[arg], rtn]
}

const label = (txt: string) => styleItalic(colorGray(txt));
const cause = (txt: string) => colorGray(txt)
export const assert = {
    /**
    * {@link strict.equal}.
    */
    equal: (actual: unknown, expected: unknown, banner: string = '') => strict.equal(actual, expected, ` ${cause('Not Equal')} ${banner}
  ${label('Expect :')} ${colorGreen(String(expected))}
  ${label('Actual :')} ${colorYellow(String(actual))}`
    ),
    /**
    * {@link strict.notEqual}.
    */
    notEqual: (actual: unknown, expected: unknown, banner: string = '') => nodeAssert.notEqual(actual, expected, ` ${cause('Is Equal')} ${banner}
  ${label('Equal Value :')} ${colorYellow(String(actual))}`
    ),

    /**
    * {@link strict.deepEqual}.
    */
    deepEqual: (actual: unknown, expected: unknown, banner: string = '') => nodeAssert.deepEqual(actual, expected, ` ${cause('Not Deep Equal')} ${banner}
  ${label('Expect :')} ${colorGreen(String(expected))}
  ${label('Actual :')} ${colorYellow(String(actual))}`
    ),

    /**
    * {@link strict.notDeepEqual}.
    */
    notDeepEqual: (actual: unknown, expected: unknown, banner: string = '') => nodeAssert.notDeepEqual(actual, expected, ` ${cause('Is Deep Equal')} ${banner}
  ${label('Equal Value :')} ${colorYellow(String(actual))}`
    ),

    /**
    * {@link strict.strictEqual}.
    */
    strictEqual: (actual: unknown, expected: unknown, banner: string = '') => nodeAssert.strictEqual(actual, expected, ` ${cause('Not Equal')}  ${banner}
  ${label('Expect :')} ${colorGreen(String(expected))}
  ${label('Actual :')} ${colorYellow(String(actual))}`
    ),

    /**
    * {@link strict.notStrictEqual}.
    */
    notStrictEqual: (actual: unknown, expected: unknown, banner: string = '') => nodeAssert.notStrictEqual(actual, expected, ` ${cause('Is Equal')} ${banner}
  ${label('Equal Value :')} ${colorYellow(String(actual))}`
    ),

    /**
    * {@link strict.match}.
    */
    match: (value: string, regExp: RegExp, banner: string = '') => nodeAssert.match(value, regExp, ` ${cause('Value does\'t Match')} ${banner}
  ${label('Regexp :')} ${String(regExp)}}
  ${label('Value  :')} ${colorYellow(value)}`
    ),

    /**
    * {@link strict.doesNotMatch}.
    */
    doesNotMatch: (value: string, regExp: RegExp, banner: string = '') => nodeAssert.doesNotMatch(value, regExp, ` ${cause('Value Matched')} ${banner}
  ${label('Regexp :')} ${String(regExp)}}
  ${label('Value  :')} ${colorYellow(value)}`
    ),

    /**
    * {@link strict.rejects}.
    */
    rejects: async (block: Promise<unknown> | (() => Promise<unknown>), banner: string = '') => nodeAssert.rejects(block, ` ${cause('Promise does not reject')} ${banner}`),

    /**
    * {@link strict.doesNotReject}.
    */
    doesNotReject: async (block: Promise<unknown> | (() => Promise<unknown>), banner: string = '') => nodeAssert.doesNotReject(block, ` ${cause('Promise reject a error')} ${banner}`),

    /**
    * {@link strict.throws}.
    */
    throws: (block: () => unknown, banner: string = '') => nodeAssert.throws(block, ` ${cause('Function does not throw error')} ${banner}`),

    /**
    * {@link strict.doesNotThrow}.
    */
    doesNotThrow: (block: () => unknown, banner: string = '') => nodeAssert.doesNotThrow(block, ` ${cause('Function throws some error')} ${banner}`),

    //     /**
    //     * {@link strict.fail}.
    //     */
    //     fail: (message?: string | Error) =>nodeAssert. fail(` ${message || ''}
    //   ${label('Test Failed')} ${colorMagenta(String(message || ''))}`
    //     ),

    /**
    * {@link strict.ok}.
    */
    ok: (value: any, banner: string = '') => nodeAssert.ok(value, ` ${cause('Not OK')} ${banner}`),
}

export const equal = (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => {
    const actual = fn.apply(self, args);
    assert.equal(actual, expected, `result of ${styleBold(colorYellow(fn.name))} is not equeal`)
}
export const equalAsync = async (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => {
    const actual = await Promise.resolve(fn.apply(self, args));
    assert.equal(actual, expected, `result of ${styleBold(colorYellow(fn.name))} is not equeal`)
}
export const equalBatch = (fn: Function, records: DataSetWithResult, self: any = null) => {
    for (let record of records) {
        const [args, expected] = getArgRtn(record);
        equal(fn, args, expected, self)
    }
}
export const equalBatchAsync = async (fn: Function, records: DataSetWithResult, self: any = null) => {
    for (let record of records) {
        const [args, expected] = getArgRtn(record);
        await equalAsync(fn, args, expected, self)
    }
}
export const testEqual = (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => test(`Test [${fn.name}]`, () => equal(fn, args, expected, self));
export const testEqualBatch = (fn: Function, records: DataSetWithResult, self: any = null) => test(`Test [${fn.name}]`, () => equalBatch(fn, records, self));
export const testEqualAsync = (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => test(`Test [${fn.name}]`, async () => await equalAsync(fn, args, expected, self));
export const testEqualBatchAsync = (fn: Function, records: DataSetWithResult, self: any = null) => test(`Test [${fn.name}]`, async () => await equalBatchAsync(fn, records, self));

export const notEqual = (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => {
    const actual = fn.apply(self, args);
    assert.notEqual(actual, expected, `result of ${styleBold(colorYellow(fn.name))} is equal`)
}

export const notEqualAsync = async (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => {
    const actual = await Promise.resolve(fn.apply(self, args));
    assert.notEqual(actual, expected, `result of ${styleBold(colorYellow(fn.name))} is equal`)
}

export const notEqualBatch = (fn: Function, records: DataSetWithResult, self: any = null) => {
    for (let record of records) {
        const [args, expected] = getArgRtn(record);
        notEqual(fn, args, expected, self)
    }
}

export const notEqualBatchAsync = async (fn: Function, records: DataSetWithResult, self: any = null) => {
    for (let record of records) {
        const [args, expected] = getArgRtn(record);
        await notEqualAsync(fn, args, expected, self)
    }
}

export const testNotEqual = (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => test(`Test [${fn.name}]`, () => notEqual(fn, args, expected, self));

export const testNotEqualBatch = (fn: Function, records: DataSetWithResult, self: any = null) => test(`Test [${fn.name}]`, () => notEqualBatch(fn, records, self));

export const testNotEqualAsync = (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => test(`Test [${fn.name}]`, async () => await notEqualAsync(fn, args, expected, self));

export const testNotEqualBatchAsync = (fn: Function, records: DataSetWithResult, self: any = null) => test(`Test [${fn.name}]`, async () => await notEqualBatchAsync(fn, records, self));

export const deepEqual = (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => {
    const actual = fn.apply(self, args);
    assert.deepEqual(actual, expected, `result of ${styleBold(colorYellow(fn.name))} is not deep equal`)
}

export const deepEqualAsync = async (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => {
    const actual = await Promise.resolve(fn.apply(self, args));
    assert.deepEqual(actual, expected, `result of ${styleBold(colorYellow(fn.name))} is not deep equal`)
}

export const deepEqualBatch = (fn: Function, records: DataSetWithResult, self: any = null) => {
    for (let record of records) {
        const [args, expected] = getArgRtn(record);
        deepEqual(fn, args, expected, self)
    }
}

export const deepEqualBatchAsync = async (fn: Function, records: DataSetWithResult, self: any = null) => {
    for (let record of records) {
        const [args, expected] = getArgRtn(record);
        await deepEqualAsync(fn, args, expected, self)
    }
}

export const testDeepEqual = (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => test(`Test [${fn.name}]`, () => deepEqual(fn, args, expected, self));

export const testDeepEqualBatch = (fn: Function, records: DataSetWithResult, self: any = null) => test(`Test [${fn.name}]`, () => deepEqualBatch(fn, records, self));

export const testDeepEqualAsync = (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => test(`Test [${fn.name}]`, async () => await deepEqualAsync(fn, args, expected, self));

export const testDeepEqualBatchAsync = (fn: Function, records: DataSetWithResult, self: any = null) => test(`Test [${fn.name}]`, async () => await deepEqualBatchAsync(fn, records, self));

export const notDeepEqual = (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => {
    const actual = fn.apply(self, args);
    assert.notDeepEqual(actual, expected, `result of ${styleBold(colorYellow(fn.name))} is deep equal`)
}

export const notDeepEqualAsync = async (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => {
    const actual = await Promise.resolve(fn.apply(self, args));
    assert.notDeepEqual(actual, expected, `result of ${styleBold(colorYellow(fn.name))} is deep equal`)
}

export const notDeepEqualBatch = (fn: Function, records: DataSetWithResult, self: any = null) => {
    for (let record of records) {
        const [args, expected] = getArgRtn(record);
        notDeepEqual(fn, args, expected, self)
    }
}

export const notDeepEqualBatchAsync = async (fn: Function, records: DataSetWithResult, self: any = null) => {
    for (let record of records) {
        const [args, expected] = getArgRtn(record);
        await notDeepEqualAsync(fn, args, expected, self)
    }
}

export const testNotDeepEqual = (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => test(`Test [${fn.name}]`, () => notDeepEqual(fn, args, expected, self));

export const testNotDeepEqualBatch = (fn: Function, records: DataSetWithResult, self: any = null) => test(`Test [${fn.name}]`, () => notDeepEqualBatch(fn, records, self));

export const testNotDeepEqualAsync = (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => test(`Test [${fn.name}]`, async () => await notDeepEqualAsync(fn, args, expected, self));

export const testNotDeepEqualBatchAsync = (fn: Function, records: DataSetWithResult, self: any = null) => test(`Test [${fn.name}]`, async () => await notDeepEqualBatchAsync(fn, records, self));

export const strictEqual = (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => {
    const actual = fn.apply(self, args);
    assert.strictEqual(actual, expected, `result of ${styleBold(colorYellow(fn.name))} is not strict equal`)
}

export const strictEqualAsync = async (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => {
    const actual = await Promise.resolve(fn.apply(self, args));
    assert.strictEqual(actual, expected, `result of ${styleBold(colorYellow(fn.name))} is not strict equal`)
}

export const strictEqualBatch = (fn: Function, records: DataSetWithResult, self: any = null) => {
    for (let record of records) {
        const [args, expected] = getArgRtn(record);
        strictEqual(fn, args, expected, self)
    }
}

export const strictEqualBatchAsync = async (fn: Function, records: DataSetWithResult, self: any = null) => {
    for (let record of records) {
        const [args, expected] = getArgRtn(record);
        await strictEqualAsync(fn, args, expected, self)
    }
}

export const testStrictEqual = (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => test(`Test [${fn.name}]`, () => strictEqual(fn, args, expected, self));

export const testStrictEqualBatch = (fn: Function, records: DataSetWithResult, self: any = null) => test(`Test [${fn.name}]`, () => strictEqualBatch(fn, records, self));

export const testStrictEqualAsync = (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => test(`Test [${fn.name}]`, async () => await strictEqualAsync(fn, args, expected, self));

export const testStrictEqualBatchAsync = (fn: Function, records: DataSetWithResult, self: any = null) => test(`Test [${fn.name}]`, async () => await strictEqualBatchAsync(fn, records, self));

export const notStrictEqual = (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => {
    const actual = fn.apply(self, args);
    assert.notStrictEqual(actual, expected, `result of ${styleBold(colorYellow(fn.name))} is strict equal`)
}

export const notStrictEqualAsync = async (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => {
    const actual = await Promise.resolve(fn.apply(self, args));
    assert.notStrictEqual(actual, expected, `result of ${styleBold(colorYellow(fn.name))} is strict equal`)
}

export const notStrictEqualBatch = (fn: Function, records: DataSetWithResult, self: any = null) => {
    for (let record of records) {
        const [args, expected] = getArgRtn(record);
        notStrictEqual(fn, args, expected, self)
    }
}

export const notStrictEqualBatchAsync = async (fn: Function, records: DataSetWithResult, self: any = null) => {
    for (let record of records) {
        const [args, expected] = getArgRtn(record);
        await notStrictEqualAsync(fn, args, expected, self)
    }
}

export const testNotStrictEqual = (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => test(`Test [${fn.name}]`, () => notStrictEqual(fn, args, expected, self));

export const testNotStrictEqualBatch = (fn: Function, records: DataSetWithResult, self: any = null) => test(`Test [${fn.name}]`, () => notStrictEqualBatch(fn, records, self));

export const testNotStrictEqualAsync = (fn: Function, args: FunctionArguments, expected: FunctionReturn, self: any = null) => test(`Test [${fn.name}]`, async () => await notStrictEqualAsync(fn, args, expected, self));

export const testNotStrictEqualBatchAsync = (fn: Function, records: DataSetWithResult, self: any = null) => test(`Test [${fn.name}]`, async () => await notStrictEqualBatchAsync(fn, records, self));

export const match = (fn: Function, args: FunctionArguments, pattern: RegExp, self: any = null) => {
    const actual = fn.apply(self, args);
    assert.match(String(actual), pattern, `result of ${styleBold(colorYellow(fn.name))} does not match pattern`)
}

export const matchAsync = async (fn: Function, args: FunctionArguments, pattern: RegExp, self: any = null) => {
    const actual = await Promise.resolve(fn.apply(self, args));
    assert.match(String(actual), pattern, `result of ${styleBold(colorYellow(fn.name))} does not match pattern`)
}

export type RecordByPattern = [FunctionArguments, RegExp];
export type DataSetWithPattern = RecordByPattern[];

export const matchBatch = (fn: Function, records: DataSetWithPattern, self: any = null) => {
    for (let record of records) {
        const [args, pattern] = getArgRtn(record);
        match(fn, args, pattern, self)
    }
}

export const matchBatchAsync = async (fn: Function, records: DataSetWithPattern, self: any = null) => {
    for (let record of records) {
        const [args, pattern] = getArgRtn(record);
        await matchAsync(fn, args, pattern, self)
    }
}

export const testMatch = (fn: Function, args: FunctionArguments, pattern: RegExp, self: any = null) =>
    test(`Test [${fn.name}]`, () => match(fn, args, pattern, self));

export const testMatchBatch = (fn: Function, records: DataSetWithPattern, self: any = null) =>
    test(`Test [${fn.name}]`, () => matchBatch(fn, records, self));

export const testMatchAsync = (fn: Function, args: FunctionArguments, pattern: RegExp, self: any = null) =>
    test(`Test [${fn.name}]`, async () => await matchAsync(fn, args, pattern, self));

export const testMatchBatchAsync = (fn: Function, records: DataSetWithPattern, self: any = null) =>
    test(`Test [${fn.name}]`, async () => await matchBatchAsync(fn, records, self));

export const doesNotMatch = (fn: Function, args: FunctionArguments, pattern: RegExp, self: any = null) => {
    const actual = fn.apply(self, args);
    assert.doesNotMatch(String(actual), pattern, `result of ${styleBold(colorYellow(fn.name))} matches pattern`)
}

export const doesNotMatchAsync = async (fn: Function, args: FunctionArguments, pattern: RegExp, self: any = null) => {
    const actual = await Promise.resolve(fn.apply(self, args));
    assert.doesNotMatch(String(actual), pattern, `result of ${styleBold(colorYellow(fn.name))} matches pattern`)
}

export const doesNotMatchBatch = (fn: Function, records: DataSetWithPattern, self: any = null) => {
    for (let record of records) {
        const [args, pattern] = getArgRtn(record);
        doesNotMatch(fn, args, pattern, self)
    }
}

export const doesNotMatchBatchAsync = async (fn: Function, records: DataSetWithPattern, self: any = null) => {
    for (let record of records) {
        const [args, pattern] = getArgRtn(record);
        await doesNotMatchAsync(fn, args, pattern, self)
    }
}

export const testDoesNotMatch = (fn: Function, args: FunctionArguments, pattern: RegExp, self: any = null) => test(`Test [${fn.name}]`, () => doesNotMatch(fn, args, pattern, self));

export const testDoesNotMatchBatch = (fn: Function, records: DataSetWithPattern, self: any = null) => test(`Test [${fn.name}]`, () => doesNotMatchBatch(fn, records, self));

export const testDoesNotMatchAsync = (fn: Function, args: FunctionArguments, pattern: RegExp, self: any = null) => test(`Test [${fn.name}]`, async () => await doesNotMatchAsync(fn, args, pattern, self));

export const testDoesNotMatchBatchAsync = (fn: Function, records: DataSetWithPattern, self: any = null) => test(`Test [${fn.name}]`, async () => await doesNotMatchBatchAsync(fn, records, self));

export const rejects = async (fn: Function, args: FunctionArguments, self: any = null) => {
    const promise = fn.apply(self, args);
    await assert.rejects(promise, `result of ${styleBold(colorYellow(fn.name))} does not reject`)
}

export const rejectsBatch = async (fn: Function, records: FunctionArguments[], self: any = null) => {
    for (let args of records) {
        if (args instanceof Array) {
            await rejects(fn, args, self)
        } else {
            await rejects(fn, [args], self)
        }
    }
}

export const testRejects = (fn: Function, args: FunctionArguments, self: any = null) => test(`Test [${fn.name}]`, async () => await rejects(fn, args, self));

export const testRejectsBatch = (fn: Function, records: FunctionArguments[], self: any = null) => test(`Test [${fn.name}]`, async () => await rejectsBatch(fn, records, self));

export const doesNotReject = async (fn: Function, args: FunctionArguments, self: any = null) => {
    const promise = fn.apply(self, args);
    await assert.doesNotReject(promise, `result of ${styleBold(colorYellow(fn.name))} rejects`)
}

export const doesNotRejectBatch = async (fn: Function, records: FunctionArguments[], self: any = null) => {
    for (let args of records) {
        if (args instanceof Array) {
            await doesNotReject(fn, args, self)
        } else {
            await doesNotReject(fn, [args], self)
        }
    }
}

export const testDoesNotReject = (fn: Function, args: FunctionArguments, self: any = null) =>
    test(`Test [${fn.name}]`, async () => await doesNotReject(fn, args, self));

export const testDoesNotRejectBatch = (fn: Function, records: FunctionArguments[], self: any = null) =>
    test(`Test [${fn.name}]`, async () => await doesNotRejectBatch(fn, records, self));

export const throws = (fn: Function, args: FunctionArguments, self: any = null) => {
    const wrapped = () => fn.apply(self, args instanceof Array ? args : [args]);
    assert.throws(wrapped, `result of ${styleBold(colorYellow(fn.name))} does not throw`)
}

export const throwsBatch = (fn: Function, records: FunctionArguments[], self: any = null) => {
    for (let args of records) {
        throws(fn, args, self)
    }
}

export const testThrows = (fn: Function, args: FunctionArguments, self: any = null) =>
    test(`Test [${fn.name}]`, () => throws(fn, args, self));

export const testThrowsBatch = (fn: Function, records: FunctionArguments[], self: any = null) =>
    test(`Test [${fn.name}]`, () => throwsBatch(fn, records, self));

export const doesNotThrow = (fn: Function, args: FunctionArguments, self: any = null) => {
    const wrapped = () => fn.apply(self, args instanceof Array ? args : [args]);
    assert.doesNotThrow(wrapped, `result of ${styleBold(colorYellow(fn.name))} throws`)
}

export const doesNotThrowBatch = (fn: Function, records: FunctionArguments[], self: any = null) => {
    for (let args of records) {
        doesNotThrow(fn, args, self)
    }
}

export const testDoesNotThrow = (fn: Function, args: FunctionArguments, self: any = null) => test(`Test [${fn.name}]`, () => doesNotThrow(fn, args, self));

export const testDoesNotThrowBatch = (fn: Function, records: FunctionArguments[], self: any = null) => test(`Test [${fn.name}]`, () => doesNotThrowBatch(fn, records, self));

export const ok = (fn: Function, args: FunctionArguments, self: any = null) => {
    const actual = fn.apply(self, args);
    assert.ok(actual, `result of ${styleBold(colorYellow(fn.name))} is not truthy`)
}

export const okAsync = async (fn: Function, args: FunctionArguments, self: any = null) => {
    const actual = await Promise.resolve(fn.apply(self, args));
    assert.ok(actual, `result of ${styleBold(colorYellow(fn.name))} is not truthy`)
}

export const okBatch = (fn: Function, records: FunctionArguments[], self: any = null) => {
    for (let args of records) {
        if (args instanceof Array) {
            ok(fn, args, self)
        } else {
            ok(fn, [args], self)
        }
    }
}

export const okBatchAsync = async (fn: Function, records: FunctionArguments[], self: any = null) => {
    for (let args of records) {
        if (args instanceof Array) {
            await okAsync(fn, args, self)
        } else {
            await okAsync(fn, [args], self)
        }
    }
}

export const testOk = (fn: Function, args: FunctionArguments, self: any = null) => test(`Test [${fn.name}]`, () => ok(fn, args, self));
export const testOkBatch = (fn: Function, records: FunctionArguments[], self: any = null) => test(`Test [${fn.name}]`, () => okBatch(fn, records, self));
export const testOkAsync = (fn: Function, args: FunctionArguments, self: any = null) => test(`Test [${fn.name}]`, async () => await okAsync(fn, args, self));
export const testOkBatchAsync = (fn: Function, records: FunctionArguments[], self: any = null) => test(`Test [${fn.name}]`, async () => await okBatchAsync(fn, records, self));



export const byCheckFunction = <T = any>(fn: (...args: any[]) => T, record: RecordByCheckFunction<T>, self: any = null) => {
    const [args, checker] = getArgRtn(record);
    const returnValue = fn.apply(self, args);
    assert.equal(checker(returnValue), true);
}
export const byCheckFunctionBatch = <T = any>(fn: (...args: any[]) => T, records: DataSetWithChecker<T>, self: any = null) => {
    for (let record of records) {
        byCheckFunction(fn, record, self);
    }
}