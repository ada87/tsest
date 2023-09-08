import assert from 'node:assert';

/**
 *  https://nodejs.org/api/assert.html
*/

// const params = (item: Array<any>): [Array<any>, any] => {
//     return [item.slice(0, item.length - 1), item[item.length - 1]]
// }


type FunctionArguments = any[];
type FunctionReturn = any;
type ResultCheckFunction<T> = (result: T) => boolean;

/**
 * Item Tuple : [ 0:args, 1:result ];
 * args   :    Arguments pass by test funciton
 * result :    Result of Function
*/
export type RecordByResult = [FunctionArguments, FunctionReturn];
export type RecordByCheckFunction<T = any> = [FunctionArguments, ResultCheckFunction<T>];
export type DataSetArguments = FunctionArguments[];
export type DataSetWithResult = RecordByResult[];
export type DataSetWithChecker<T = any> = RecordByCheckFunction<T>[];


// Batch equal
export const equal = (fn: Function, dataSet: DataSetWithResult, ctx: any = null) => {
    for (let item of dataSet) {
        const [args, expected] = item
        const actual = fn.apply(ctx, args);
        assert.equal(actual, expected);
    }
}


// Batch notEqual
export const notEqual = (fn: Function, dataSet: DataSetWithResult, ctx: any = null) => {
    for (let item of dataSet) {
        const [args, expected] = item
        const actual = fn.apply(ctx, args);
        assert.notEqual(actual, expected);
    }
}



// Batch deepEqual
export const deepEqual = (fn: Function, dataSet: DataSetWithResult, ctx: any = null) => {
    for (let item of dataSet) {
        const [args, expected] = item
        const actual = fn.apply(ctx, args);
        assert.deepEqual(actual, expected);
    }
}

// Batch notDeepEqual
export const notDeepEqual = (fn: Function, dataSet: DataSetWithResult, ctx: any = null) => {
    for (let item of dataSet) {
        const [args, expected] = item
        const actual = fn.apply(ctx, args);
        assert.notDeepEqual(actual, expected);
    }
}

// Batch strictEqual
export const strictEqual = (fn: Function, dataSet: DataSetWithResult, ctx: any = null) => {
    for (let item of dataSet) {
        const [args, expected] = item
        const actual = fn.apply(ctx, args);
        assert.strictEqual(actual, expected);
    }
}

// Batch notStrictEqual
export const notStrictEqual = (fn: Function, dataSet: DataSetWithResult, ctx: any = null) => {
    for (let item of dataSet) {
        const [args, expected] = item
        const actual = fn.apply(ctx, args);
        assert.notStrictEqual(actual, expected);
    }
}

// Batch deepStrictEqual
export const deepStrictEqual = (fn: Function, dataSet: DataSetWithResult, ctx: any = null) => {
    for (let item of dataSet) {
        const [args, expected] = item;
        const actual = fn.apply(ctx, args);
        assert.deepStrictEqual(actual, expected);
    }
}

// Batch notDeepStrictEqual
export const notDeepStrictEqual = (fn: Function, dataSet: DataSetWithResult, ctx: any = null) => {
    for (let item of dataSet) {
        const [args, expected] = item;
        const actual = fn.apply(ctx, args);
        assert.notDeepStrictEqual(actual, expected);
    }
}



// Batch match and doesNotMatch
export const match = (reg: RegExp, dataSet: Array<[string, boolean]>) => {
    for (let [item, isMatch] of dataSet) {
        if (isMatch) {
            assert.match(item, reg);
        } else {
            assert.doesNotMatch(item, reg)
        }
    }
}


export const isTrue = (fn: Function, dataSet: DataSetArguments, ctx: any = null) => {
    for (let item of dataSet) {
        const actual = fn.apply(item);
        assert.equal(actual, true);
    }
}

export const isFalse = (fn: Function, dataSet: DataSetArguments, ctx: any = null) => {
    for (let item of dataSet) {
        const actual = fn.apply(ctx, item);
        assert.equal(actual, false);
    }
}

export const doesNotThrow = (fn: Function, dataSet: DataSetArguments, ctx: any = null) => {
    for (let args of dataSet) {
        assert.doesNotThrow(fn.apply(ctx, args))
    }
}

export const doesNotReject = (fn: Function, dataSet: DataSetArguments, ctx: any = null) => {
    for (let args of dataSet) {
        assert.doesNotReject(fn.apply(ctx, args))
    }
}

export const byCheckFunction = <T = any>(fn: (...args: any[]) => T, dataSet: DataSetWithChecker<T>, ctx: any = null) => {
    for (let record of dataSet) {
        const [args, checker] = record;
        const returnValue = fn.apply(ctx, args);
        assert.equal(checker(returnValue), true);
    }
}
