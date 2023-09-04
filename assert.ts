import assert from 'node:assert';

/**
 *  https://nodejs.org/api/assert.html
*/

const params = (item: Array<any>): [Array<any>, any] => {
    return [item.slice(0, item.length - 1), item[item.length - 1]]
}

// Batch equal
export const equal = (fn: Function, dataSet: Array<Array<any>>, ctx: any = null) => {
    for (let item of dataSet) {
        const [args, expected] = params(item);
        const actual = fn.apply(ctx, args);
        assert.equal(actual, expected);
    }
}


// Batch notEqual
export const notEqual = (fn: Function, dataSet: Array<Array<any>>, ctx: any = null) => {
    for (let item of dataSet) {
        const [args, expected] = params(item);
        const actual = fn.apply(ctx, args);
        assert.notEqual(actual, expected);
    }
}



// Batch deepEqual
export const deepEqual = (fn: Function, dataSet: Array<Array<any>>, ctx: any = null) => {
    for (let item of dataSet) {
        const [args, expected] = params(item);
        const actual = fn.apply(ctx, args);
        assert.deepEqual(actual, expected);
    }
}

// Batch notDeepEqual
export const notDeepEqual = (fn: Function, dataSet: Array<Array<any>>, ctx: any = null) => {
    for (let item of dataSet) {
        const [args, expected] = params(item);
        const actual = fn.apply(ctx, args);
        assert.notDeepEqual(actual, expected);
    }
}

// Batch strictEqual
export const strictEqual = (fn: Function, dataSet: Array<Array<any>>, ctx: any = null) => {
    for (let item of dataSet) {
        const [args, expected] = params(item);
        const actual = fn.apply(ctx, args);
        assert.strictEqual(actual, expected);
    }
}

// Batch notStrictEqual
export const notStrictEqual = (fn: Function, dataSet: Array<Array<any>>, ctx: any = null) => {
    for (let item of dataSet) {
        const [args, expected] = params(item);
        const actual = fn.apply(ctx, args);
        assert.notStrictEqual(actual, expected);
    }
}

// Batch deepStrictEqual
export const deepStrictEqual = (fn: Function, dataSet: Array<Array<any>>, ctx: any = null) => {
    for (let item of dataSet) {
        const [args, expected] = params(item);
        const actual = fn.apply(ctx, args);
        assert.deepStrictEqual(actual, expected);
    }
}

// Batch notDeepStrictEqual
export const notDeepStrictEqual = (fn: Function, dataSet: Array<Array<any>>, ctx: any = null) => {
    for (let item of dataSet) {
        const [args, expected] = params(item);
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


export const isTrue = (fn: Function, dataSet: Array<Array<any>>, ctx: any = null) => {
    for (let item of dataSet) {
        const actual = fn.apply(item);
        assert.equal(actual, true);
    }
}

export const isFalse = (fn: Function, dataSet: Array<Array<any>>, ctx: any = null) => {
    for (let item of dataSet) {
        const actual = fn.apply(ctx, item);
        assert.equal(actual, false);
    }
}


