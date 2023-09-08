import { test, } from 'node:test';
import {
    equal, notEqual, deepEqual, notDeepEqual, deepStrictEqual, notDeepStrictEqual, strictEqual, notStrictEqual,
    isTrue, isFalse,
    throws, rejects, doesNotThrow, doesNotReject,
    byCheckFunction,
} from './assert';

import type { DataSetArguments, DataSetWithResult, DataSetWithChecker } from './assert'

export const testEqual = (fn: Function, dataSet: DataSetWithResult, self?: any) => test(`Test [${fn.name}]`, () => equal(fn, dataSet, self));
export const testnotEqual = (fn: Function, dataSet: DataSetWithResult, self?: any) => test(`Test [${fn.name}]`, () => notEqual(fn, dataSet, self));

export const testStrictEqual = (fn: Function, dataSet: DataSetWithResult, self?: any) => test(`Test [${fn.name}]`, () => strictEqual(fn, dataSet, self));
export const testNotStrictEqual = (fn: Function, dataSet: DataSetWithResult, self?: any) => test(`Test [${fn.name}]`, () => notStrictEqual(fn, dataSet, self));

export const testDeepEqual = (fn: Function, dataSet: DataSetWithResult, self?: any) => test(`Test [${fn.name}]`, () => deepEqual(fn, dataSet, self));
export const testNotDeepEqual = (fn: Function, dataSet: DataSetWithResult, self?: any) => test(`Test [${fn.name}]`, () => notDeepEqual(fn, dataSet, self));

export const testDeepStrictEqual = (fn: Function, dataSet: DataSetWithResult, self?: any) => test(`Test [${fn.name}]`, () => deepStrictEqual(fn, dataSet, self));
export const testNotDeepStrictEqual = (fn: Function, dataSet: DataSetWithResult, self?: any) => test(`Test [${fn.name}]`, () => notDeepStrictEqual(fn, dataSet, self));

export const testIsTure = (fn: Function, dataSet: DataSetArguments, self?: any) => test(`Test [${fn.name}]`, () => isTrue(fn, dataSet, self));
export const testIsFalse = (fn: Function, dataSet: DataSetArguments, self?: any) => test(`Test [${fn.name}]`, () => isFalse(fn, dataSet, self));

export const testThrows = (fn: Function, dataSet: DataSetArguments, self?: any) => test(`Test [${fn.name}]`, () => throws(fn, dataSet, self));
export const testDoesNotThrow = (fn: Function, dataSet: DataSetArguments, self?: any) => test(`Test [${fn.name}]`, () => doesNotThrow(fn, dataSet, self));

export const testRejects = (fn: Function, dataSet: DataSetArguments, self?: any) => test(`Test [${fn.name}]`, () => rejects(fn, dataSet, self));
export const testDoesNotReject = (fn: Function, dataSet: DataSetArguments, self?: any) => test(`Test [${fn.name}]`, () => doesNotReject(fn, dataSet, self));

export const testByCheckFunction = <T = any>(fn: (...args: any[]) => T, dataSet: DataSetWithChecker) => test(`Test [${fn.name}]`, () => byCheckFunction(fn, dataSet, self));