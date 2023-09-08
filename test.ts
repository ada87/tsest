import { test } from 'node:test';
import {
    equal, notEqual, deepEqual, notDeepEqual, deepStrictEqual, notDeepStrictEqual, strictEqual, notStrictEqual,
    isTrue, isFalse, doesNotThrow, doesNotReject,
    byCheckFunction,
} from './assert';

import type { DataSetArguments, DataSetWithResult, DataSetWithChecker } from './assert'

export const testEqual = (fn: Function, dataSet: DataSetWithResult) => test(`Test [${fn.name}]`, (ctx) => equal(fn, dataSet, ctx));
export const testnotEqual = (fn: Function, dataSet: DataSetWithResult) => test(`Test [${fn.name}]`, (ctx) => notEqual(fn, dataSet, ctx));

export const testStrictEqual = (fn: Function, dataSet: DataSetWithResult) => test(`Test [${fn.name}]`, (ctx) => strictEqual(fn, dataSet, ctx));
export const testNotStrictEqual = (fn: Function, dataSet: DataSetWithResult) => test(`Test [${fn.name}]`, (ctx) => notStrictEqual(fn, dataSet, ctx));

export const testDeepEqual = (fn: Function, dataSet: DataSetWithResult) => test(`Test [${fn.name}]`, (ctx) => deepEqual(fn, dataSet, ctx));
export const testNotDeepEqual = (fn: Function, dataSet: DataSetWithResult) => test(`Test [${fn.name}]`, (ctx) => notDeepEqual(fn, dataSet, ctx));

export const testDeepStrictEqual = (fn: Function, dataSet: DataSetWithResult) => test(`Test [${fn.name}]`, (ctx) => deepStrictEqual(fn, dataSet, ctx));
export const testNotDeepStrictEqual = (fn: Function, dataSet: DataSetWithResult) => test(`Test [${fn.name}]`, (ctx) => notDeepStrictEqual(fn, dataSet, ctx));

export const testIsTure = (fn: Function, dataSet: DataSetArguments) => test(`Test [${fn.name}]`, (ctx) => isTrue(fn, dataSet, ctx));
export const testIsFalse = (fn: Function, dataSet: DataSetArguments) => test(`Test [${fn.name}]`, (ctx) => isFalse(fn, dataSet, ctx));

export const testDoesNotThrow = (fn: Function, dataSet: DataSetArguments) => test(`Test [${fn.name}]`, (ctx) => doesNotThrow(fn, dataSet, ctx));
export const testDoesNotReject = (fn: Function, dataSet: DataSetArguments) => test(`Test [${fn.name}]`, (ctx) => doesNotReject(fn, dataSet, ctx));

export const testByCheckFunction = <T = any>(fn: (...args: any[]) => T, dataSet: DataSetWithChecker) => test(`Test [${fn.name}]`, (ctx) => byCheckFunction(fn, dataSet, ctx));