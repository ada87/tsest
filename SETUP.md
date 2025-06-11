# TypeScript

1. default test file suffix is `.test.ts`
2. use `run.cjs` test 'CommonJS' or `run.js` test 'ESM'
3. use `ts-node` or `--experimental-strip-types` to support `TypeScript`
4. at now, `--experimental-strip-types` has some issues, recommend use `ts-node`

## CommonJS

1. `tsconfig.json`

```json
{
    "compilerOptions": {
        "module": "CommonJS"
    }
}
```


2. `package.json`

```json
{
    "scripts": {
        // ts-node
        "test:tsnode": "node -r ts-node/register node_modules/tsest/run.cjs",
        "watch:tsnode": "node -r ts-node/register node_modules/tsest/run.cjs --watch",
        // node
        "test:node": "node --experimental-strip-types node_modules/tsest/run.cjs",
        "watch:node": "node --experimental-strip-types node_modules/tsest/run.cjs --watch",
    }

}
```


## ESM

1. `tsconfig`

```json
{
    "compilerOptions": {
        "module": "ESNext"
    },
    "ts-node": {
        "esm": true
    }
}
```

2. `package.json`

```json
{
    "type": "module",
    "scripts": {
        // ts-node
        "test:tsnode": "node --loader ts-node/esm node_modules/tsest/run",
        "watch:tsnode": "node --loader ts-node/esm node_modules/tsest/run --watch",
        // node
        "test:node": "node --experimental-strip-types node_modules/tsest/run.js",  
        "watch:node": "node --experimental-strip-types node_modules/tsest/run.js --watch"
    }   
}

```


# JavaScript

`tsest` also supports `JavaScript` files. suffix of Javascript Test file is `.test.js`.

not need `ts-node` or `--experimental-strip-types`

## CommonJS

`package.json`

```
{
    "scripts": {
        "test": "node node_modules/tsest/run.cjs",  
        "watch": "node node_modules/tsest/run.cjs --watch"
    }   
}
```

## ESM

`package.json`

```
{
    "type": "module",
    "scripts": {
        "test": "node node_modules/tsest/run.js",
        "watch": "node node_modules/tsest/run.js --watch"
    }
}