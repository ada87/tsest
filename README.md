# tsest

[中文](README_ZH.md)  | ![npm version](https://img.shields.io/npm/v/tsest.svg?style=flat)

**tsest** is a Bootstarp Script of `node:test`, support `typescript`, None dependencies;

Write testcase in official syntax, ref:

1. Node Test : https://nodejs.org/api/test.html
2. Node Assert : https://nodejs.org/api/assert.html


## Ussage

1. Install

```bash
# For ts usage, must install typescript ts-node in your project.
npm install --save-dev typescript ts-node tsest
```

2. Edit package.json


```json
{
    "test": "node -r ts-node/register node_modules/tsest/run",
    "watch":"node -r ts-node/register node_modules/tsest/run --watch", 
}
```

3. Write Test code with suffix : `.test.ts` , eg. `sum.test.ts`

```typescript
import { test } from 'node:test';
import assert from 'node:assert';
import { sum } from './mylib'; 

test('test case',()=>{
    assert.strictEqual(sum(1,2), 3);
});
```


4. Done

Run Command Interface

```bash
# Test Code
npm run test 
# Test Code Watch Mode
npm run watch
```


## Custom Ussage

Use `node_modules/tsest/run`, can start test without any code. But args is default:

| param  | type                          | default                      |
| ------ | ----------------------------- | ---------------------------- |
| root   | string                        | `./src` if exists, nor: `./` |
| suffix | string                        | '.test.ts'                   |
| filter | (filePath: string) => boolean | ()=>true                     |


you can change it by custom code:


1. create script.ts 

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

2. modify `package.json`,change `node_modules/tsest/run` to `script.ts`.

```json
"scripts": {
    "test": "node -r ts-node/register script.ts",
    "watch": "node -r ts-node/register script.ts -w"
},
```
