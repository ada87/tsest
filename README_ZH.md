# tsest

[English](README.md)  | ![npm version](https://img.shields.io/npm/v/tsest.svg?style=flat)


**tsest** 是一个基于 `node:test` 的单元测试启动脚本，支持 `typescript`，没有任何依赖。

测试用例编写参考：


1. Node Test : https://nodejs.org/api/test.html
2. Node Assert : https://nodejs.org/api/assert.html


## 使用

1. 安装

```bash
# 在 typescript 项目中，需要安装  typescript 及 ts-node
npm install --save-dev typescript ts-node tsest
```

2. 编辑 package.json


```json
{
    "test": "node -r ts-node/register node_modules/tsest/run",
    "watch":"node -r ts-node/register node_modules/tsest/run -w", 
}

或是 ESM:

{
    "test": "node --loader ts-node/esm node_modules/tsest/run",
    "watch": "node --loader ts-node/esm node_modules/tsest/run --watch"
}
```

3. 编写测试用便: 默认以  `.test.ts` 为后缀，示例：

```typescript
import { test } from 'node:test';
import assert from 'node:assert';
import { sum } from './mylib'; 

test('test case',()=>{
    assert.strictEqual(sum(1,2), 3);
});
```


4. 完成

通过 npm 命令即可运行

```bash
# 运行测试
npm run test 
# 监控模式运行测试
npm run watch
```


## 自定义

使用内置脚本 `node_modules/tsest/run.js` 启动，不需要往项目里面加启动文件，但只能使用默认参数：

| param  | type                          | default                                         |
| ------ | ----------------------------- | ----------------------------------------------- |
| root   | string                        | 探测到 `./src` 目录，则为 src目录，否则为根目录 |
| suffix | string                        | '.test.ts'                                      |
| filter | (filePath: string) => boolean | ()=>true                                        |


若不想使用默认参数，则需要自定义一个启动脚本，方法如下

1. 创建并编辑 script.ts 

```typescript
import { start } from 'jstest/start';
import { watch } from 'jstest/watch';

// test '*.spec.test.ts' code in './lib', 'only test file ends with StringUtil.spec.test.ts'
const options = { 
    root: './lib',
    suffix: '.spec.test.ts',
    filter:(fileName:string)=>fileName.endsWith('StringUtil.spec.test.ts')
}

const cmd = process.argv[process.argv.length - 1];
if (cmd == '--watch' || cmd == '-w') {
    watch(options)
} else {
    start(options)
}
```

2. 修改 `package.json`,把 `node_modules/tsest/run` 改成 `script.ts` 如下：.

```json
"scripts": {
    "test": "node -r ts-node/register script.ts",
    "watch": "node -r ts-node/register script.ts -w"
}
```
