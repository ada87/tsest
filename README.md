# TypeScript-Test

`tsest` is a Bootstarp Tool of 'node:test', for `TypeScript` Project.

No modify for test framework, Write testcase in official syntax, ref:

1. Node Official Test : https://nodejs.org/api/test.html
2. Node Official Assert : https://nodejs.org/api/assert.html
3. This tool is Extremely simple less than 100 lines, you cloud not install and [copy code](nttest.ts) to script file for custom bootstrap.
4. Provide optional assert tool for simpify assert code.

## Ussage

1. Install

```bash
npm install --save-dev typescript ts-node tsest
```

2. Edit package.json


```json
{
    "test": "node -r ts-node/register node_modules/ottest/index.ts",
    "watch": "node -r ts-node/register node_modules/ottest/index.ts --watch",
}
```

3. Done

Run Comands 

```bash
# Test code
npm run test import { RUN } from './nttest';

const cmd = process.argv[process.argv.length - 1];
const watch = cmd == '--watch' || cmd == '-w'
RUN({ watch })
# Test code  / watch mode
npm run watch
```


## Custom Ussage

You can create Custom BootStrap entity File for custom ussage.

1. create script.ts 

```typescript
import { RUN } from './otest/otest'

const cmd = process.argv[process.argv.length - 1];
const watch = cmd == '--watch' || cmd == '-w'
RUN({ 
    watch ,
    root: './lib',
    filter:(fileName:string)=>fileName.endsWith('StringTest.test.ts')
})

```

2. modify `package.json`

```json
"scripts": {
    "test": "node -r ts-node/register script.ts",
    "watch": "node -r ts-node/register script.ts -w"
},
```



## For JavaScript

NTTest amaid for typescript, but also in JavaScript 

