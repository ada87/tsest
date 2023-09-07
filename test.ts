import { test } from 'node:test';

import { equal, notEqual, deepEqual, notDeepEqual, deepStrictEqual, notDeepStrictEqual, strictEqual, notStrictEqual, isTrue, isFalse } from './assert';

export { test };



export const testEqual = (fn: Function, dataSet: Array<Array<any>>) => test(`Test [${fn.name}]`, (ctx) => equal(fn, dataSet, ctx));
export const testnotEqual = (fn: Function, dataSet: Array<Array<any>>) => test(`Test [${fn.name}]`, (ctx) => notEqual(fn, dataSet, ctx));

export const testStrictEqual = (fn: Function, dataSet: Array<Array<any>>) => test(`Test [${fn.name}]`, (ctx) => strictEqual(fn, dataSet, ctx));
export const testNotStrictEqual = (fn: Function, dataSet: Array<Array<any>>) => test(`Test [${fn.name}]`, (ctx) => notStrictEqual(fn, dataSet, ctx));

export const testDeepEqual = (fn: Function, dataSet: Array<Array<any>>) => test(`Test [${fn.name}]`, (ctx) => deepEqual(fn, dataSet, ctx));
export const testNotDeepEqual = (fn: Function, dataSet: Array<Array<any>>) => test(`Test [${fn.name}]`, (ctx) => notDeepEqual(fn, dataSet, ctx));

export const testDeepStrictEqual = (fn: Function, dataSet: Array<Array<any>>) => test(`Test [${fn.name}]`, (ctx) => deepStrictEqual(fn, dataSet, ctx));
export const testNotDeepStrictEqual = (fn: Function, dataSet: Array<Array<any>>) => test(`Test [${fn.name}]`, (ctx) => notDeepStrictEqual(fn, dataSet, ctx));

export const testIsTure = (fn: Function, dataSet: Array<Array<any>>) => test(`Test [${fn.name}]`, (ctx) => isTrue(fn, dataSet, ctx));
export const testIsFalse = (fn: Function, dataSet: Array<Array<any>>) => test(`Test [${fn.name}]`, (ctx) => isFalse(fn, dataSet, ctx));


