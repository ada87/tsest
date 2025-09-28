# tsest

[English](README.md)  | ![npm version](https://img.shields.io/npm/v/tsest.svg?style=flat)

**tsest** 是一个基于 `node:test` 的单元测试启动器，支持 `typescript`。

## 安装

1. 安装 `tsest`, npm/pnpm/yarn/cnpm 均可

```bash
npm install --save-dev tsest @types/node
```
  
2. 可选

```bash
# 支持
npm install -g tsx              # (global tsx)
npm install --save-dev tsx      # (spec tsx)
npm install -g ts-node          # (global ts-node)
npm install --save-dev ts-node  # (spec ts-node)
# or do-nothing                 # (也可以什么都不装，使用 node --experimental-strip-types 目前依然不稳定)
```

## 运行

简单的 tsx/esm 配置
```json
{
    "scripts" : {
        "test": "tsx ./node_modules/tsest/run",
        "watch": "tsx ./node_modules/tsest/run --watch",
    }
}
```

简单的 tsx/cjs 配置
```json
{
    "scripts" : {
        "test": "tsx ./node_modules/tsest/run-cjs",
        "watch": "tsx ./node_modules/tsest/run-cjs --watch",
    }
}
```


[更多配置参考](./SETUP.md)


```bash
# 运行测试用例
npm run test
# Watch mode
npm run watch

# 快速执行，无类型检查
tsx node_modules/tsest/run --watch --root=./src --suffix=.test.ts --test-only
node --experimental-strip-types node_modules/tsest/run --watch --root=./src --suffix=.test.ts --test-only

# 开发时类型检查
node -r ts-node/register node_modules/tsest/run --watch --root=./src --suffix=.test.ts --test-only
```

### TypeScript 支持

`tsest` 支持多种 TypeScript 运行环境：

| 运行器 | 命令示例 | 类型检查 | 性能 |
| ------ | -------- | -------- | ---- |
| tsx | `tsx node_modules/tsest/run` | ❌ | ⚡ 快速 |
| Node.js 内置 | `node --experimental-strip-types node_modules/tsest/run` | ❌ | ⚡ 快速 |
| ts-node | `node -r ts-node/register node_modules/tsest/run` | ✅ | 🐌 较慢 |

### 支持性说明

  
| node 参数                          | 支持性                                   | 说明 ｜
| -------------------------------- | ------------------------------------- |----｜
| --watch                          | ✅                                     | ｜
| --test-only                           | ✅                                     | ｜
| --test-name-pattern              | ✅                                     | 支持别名 --name-pattern ｜
| --test-skip-pattern              | ✅                                     | 支持别名 --skip-pattern｜
| --test-concurrency               | ✅                                     |｜
| --no-experimental-strip-types    | ✅    								| ｜
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