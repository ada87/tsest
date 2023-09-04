import assert from 'node:assert';


export const equal = (fn: Function, dataSet: Array<Array<any>>, ctx = null) => {
    for (let i = 0, _i = dataSet.length; i < _i; i++) {
        let item = dataSet[i];
        const result = fn.apply(ctx, item.slice(0, item.length - 1));
        assert.equal(result, item[item.length - 1]);

    }
}

export const strictEqual = (fn: Function, dataSet: Array<Array<any>>, ctx = null) => {
    for (let i = 0, _i = dataSet.length; i < _i; i++) {
        let item = dataSet[i];
        const result = fn.apply(ctx, item.slice(0, item.length - 1));
        assert.strictEqual(result, item[item.length - 1]);

    }
}

export const doesNotThrow = (fn: Function, dataSet: Array<Array<any>>, ctx = null) => {
    for (let i = 0, _i = dataSet.length; i < _i; i++) {
        let item = dataSet[i];
        assert.doesNotThrow(fn.apply(ctx, item))
    }
}