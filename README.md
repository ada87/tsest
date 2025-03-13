# tsest

[中文](README_ZH.md)  | ![npm version](https://img.shields.io/npm/v/tsest.svg?style=flat)


## Introduction

**tsest** is a unit test runner script based on `node:test`, for `TypeScript`.

1. Based on native `node:test`📍, using standard [Test API](https://nodejs.org/api/test.html) and [Assert API](https://nodejs.org/api/assert.html).
2. TypeScript
3. Supports most parameters of the native `node --test` runner, with additional filtering parameters
4. Optimized error messages 🚀
5. Provides a full set of convenient APIs

## Installation

### Install related libraries

```bash
# In a typescript project, you need to install typescript and ts-node
npm install --save-dev typescript @types/node ts-node tsest
```

### Edit package.json

```json
"scripts": {
    "test": "node -r ts-node/register node_modules/tsest/run.cjs",
    "watch":"node -r ts-node/register node_modules/tsest/run.cjs --watch"
}
Or ESM:
"scripts": {
    "test": "node --loader ts-node/esm node_modules/tsest/run",
    "watch": "node --loader ts-node/esm node_modules/tsest/run --watch"
}
```

[Full Configuration](./SETUP.md)


## Run

```bash
# Run test cases
npm run test
# Watch mode
npm run watch
# You can also run through the node command
node -r ts-node/register node_modules/tsest/run --watch --root=./src --suffix=.test.ts --test-only
```

### Support Description

| node parameter                    | Support                                  | Note |
| --------------------------------- | ---------------------------------------- | ------ |
| --watch                           | ✅                                        | |
| --test-only                       | ✅                                     | |
| --test-name-pattern               | ✅                                        | support alias `--name-pattern` |
| --test-skip-pattern               | ✅                                        | support alias `--skip-pattern` |
| --test-concurrency                | ✅                                    | support alias `--concurrency` |
| --no-experimental-strip-types     | ✅  |  |
| --experimental-test-coverage      | ❌                                        | |
| --test-coverage-include            | ❌                                        | |
| --test-coverage-exclude           | ❌                                        | |
| --test-reporter                   | ❌                                        | |
| --test-reporter-destination       | ❌                                        | |
| --test-update-snapshots           | ❌                                        | |
| --experimental-test-module-mocks  | ❌                                        | |

`tsest` additional support

| Parameter             | Description          |
| --------------------- | -------------------- |
| --root                | Specify test root directory |
| --test-file-pattern    | Specify test file name pattern , alias --test-file-name, --file-name |
| --test-file-suffix    | Specify test file suffix, alias --file-suffix |
| --strict             | use `assert/strict`, default is `assert/default`  |
| --timeout             | Timeout, ms          |
| --force-exit          | Force exit           |

## API

Using [node native API](https://nodejs.org/api/test.html) and [Assert API](https://nodejs.org/api/assert.html), as follows:

```typescript
import { test } from 'node:test';
import assert from 'node:assert';
import { sum } from './mylib';

test('test case', () => {
    assert.equal(sum(1, 2), 3);
});
```

`tsest` provides more convenient equivalent APIs, optimized message prompts, and supports batch and asynchronous features.

```typescript
import {
    test,                       // test is equivalent to import { test } from 'node:test'
    assert,                     // assert is different from node:assert, with some message optimizations,
                                // run --strict to use node:assert/strict , or use assert:assert.default
                                // if you need to use native assertions, please use node:assert
    equal, equalAsync,          // taking equal as an example, all assertions have 8 methods for async x batch x quick test
    equalBatch, equalBatchAsync,
    testEqual, testEqualAsync,
    testEqualBatch, testEqualBatchAsync,
} from 'tsest';

const sum = (a: number, b: number) => a + b;
const sumAsync = async (a: number, b: number) => new Promise(r => setTimeout(r, 1000, a + b));

test('test case', () => {
    assert.equal(sum(1, 2), 3);
    equal(sum, [1, 2], 3);
    equal(sum, [2, 3], 5);
    equalBatch(sum, [
        [[1, 2], 3],
        [[2, 3], 5],
    ])                      // Batch test, each record is an array
})

test('test async case', async () => {
    // For asynchronous methods, use equalAsync for testing
    // Please note that you need to add the await statement
    await equalAsync(sumAsync, [1, 2], 3);
    await equalAsync(sumAsync, [2, 3], 5);
    await equalBatchAsync(sum, [
        [[1, 2], 3],
        [[2, 3], 5],
    ])                      // Batch test asynchronous methods
})

// Directly test this method
testEqual(sum, [1, 2], 3);

// Directly perform batch testing
testEqualBatch(sum, [
    [[1, 2], 3],
    [[2, 3], 5],
])

// Directly test asynchronous methods
testEqualAsync(sumAsync, [1, 2], 3);

// Directly perform batch testing of asynchronous methods
testEqualBatchAsync(sum, [
    [[1, 2], 3],
    [[2, 3], 5],
])
```

```bash
npm test # or npm run watch
✅ test case (0.6166ms)
✅ test async case (2005.9943ms)
✅ Test [sum] (0.3962ms)
✅ Test [sum] (0.1730ms)
✅ Test [sumAsync] (1012.1937ms)
✅ Test [sum] (0.6077ms)
```
