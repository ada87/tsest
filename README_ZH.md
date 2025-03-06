# tsest

[English](README.md)  | ![npm version](https://img.shields.io/npm/v/tsest.svg?style=flat)

## 介绍
  
**tsest** 是一个基于 `node:test` 的单元测试启动器，支持 `typescript`。

  
1. TypeScript 
2. 原生 [node:test](https://nodejs.org/api/test.html)📍。
3. 无依赖，无插件，零配置，无代码污染。
4. 优化错误提示 🚀, 支持参数使用严格模式！
5. 全套测试/断言 便捷 API（ 批量 x 异步 x 快捷方式 ）


## 安装

### 安装相关库

```bash
# 在 typescript 项目中，需要安装  typescript 及 ts-node
npm install --save-dev typescript @types/node ts-node tsest
```
### 编辑 package.json

```json
"scripts": {
    "test": "node -r ts-node/register node_modules/tsest/run",
    "watch":"node -r ts-node/register node_modules/tsest/run --watch"
}
或是 ESM:
"scripts": {
    "test": "node --loader ts-node/esm node_modules/tsest/run",
    "watch": "node --loader ts-node/esm node_modules/tsest/run --watch"
}
```
## 运行

```bash
# 运行测试用例
npm run test
# Watch mode
npm run watch
# 也可通过node命令运行
node -r ts-node/register node_modules/tsest/run --watch --root=./src --suffix=.test.ts --test-only
```
### 支持性说明

  
| node 参数                          | 支持性                                   | 说明 ｜
| -------------------------------- | ------------------------------------- |----｜
| --watch                          | ✅                                     |｜
| --test-only                           | ✅                                     |｜
| --test-name-pattern              | ✅                                     | 支持别名 --name-pattern ｜
| --test-skip-pattern              | ✅                                     | 支持别名 --skip-pattern｜
| --test-concurrency               | ✅                                     |｜
| --no-experimental-strip-types    | ✅ ❌    								|(支持解析此参数，目前此参数存在BUG，建议使用 ts-node)｜
| --experimental-test-coverage     | ❌                                     |｜
| --test-coverage-include           | ❌                                     |｜
| --test-coverage-exclude          | ❌                                     |｜
| --test-reporter                  | ❌                                     |｜
| --test-reporter-destination      | ❌                                     |｜
| --test-update-snapshots          | ❌                                     |｜
| --experimental-test-module-mocks | ❌                                     |｜

`tsest` 额外支持

| 参数                 | 说明       |
| ------------------ | -------- |
| --root             | 指定代码根目录，不指定时，会先探测 './src'，不存在时则默认当前目录  |
| --test-file-pattern   | 指定测试文件后缀，别名 --test-file-name , --file-name |
| --test-file-suffix | 指定测试文件后缀，别名 --file-suffix |
| --strict          | 使用 assert/strict, 默认 assert/default  |
| --timeout          | 超时时间, ms |
| --force-exit       | 强制退出     |

## API

使用 [node 原生API](https://nodejs.org/api/test.html) 及 [断言API](https://nodejs.org/api/assert.html)， 如下：

```typescript
import { test } from 'node:test';
import assert from 'node:assert';
import { sum } from './mylib';

test('test case',()=>{
    assert.equal(sum(1,2), 3);
});
```

`tsest` 提供了更加方便的等效API，优化消息提示，支持批量，异步等特性。

```typescript
import {
    test,                       // test 与 import { test } from  'node:test' 完全等效
    assert,                     // assert 不同于 node:assert ， 进行了部分消息优化，
							    // 如需要使用原生断言 ，请使用 node:assert
    equal, equalAsync,          // 以 equal 为例，所有的断言都有 异步 x 批量 x 快捷test 8个方法
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
    ])                  // 批量测试， 每条记录为一个数组
})

test('test async case', async () => {
    // 对于 异步方法，使用 equalAsync 进行测试
    // 请注意需要加 await 语句
    await equalAsync(sumAsync, [1, 2], 3);
    await equalAsync(sumAsync, [2, 3], 5);
    await equalBatchAsync(sum, [
        [[1, 2], 3],
        [[2, 3], 5],
    ])                  // 批量测试异步方法
})

// 直接测试此方法
testEqual(sum, [1, 2], 3);      

// 直接进行批量测试
testEqualBatch(sum, [
    [[1, 2], 3],
    [[2, 3], 5],
])


// 直接测试异步方法
testEqualAsync(sumAsync, [1, 2], 3);

// 直接进行批量测试异步方法
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