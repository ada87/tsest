# TypeScript Setup Guide

This guide covers different setup combinations for TypeScript projects with `tsest`.

## Configuration Matrix

| Tool | Location | Project Type | Command |
|------|----------|--------------|---------|
| tsx | Global (-g) | ESM | `tsx node_modules/tsest/run` |
| tsx | Global (-g) | CJS | `tsx node_modules/tsest/run-cjs` |
| tsx | Local (--save-dev) | ESM | `tsx node_modules/tsest/run` |
| tsx | Local (--save-dev) | CJS | `tsx node_modules/tsest/run-cjs` |
| ts-node | Global (-g) | ESM | `node --loader ts-node/esm node_modules/tsest/run` |
| ts-node | Global (-g) | CJS | `node -r ts-node/register node_modules/tsest/run-cjs` |
| ts-node | Local (--save-dev) | ESM | `node --loader ts-node/esm node_modules/tsest/run` |
| ts-node | Local (--save-dev) | CJS | `node -r ts-node/register node_modules/tsest/run-cjs` |
| node | Built-in | ESM | `node --experimental-strip-types node_modules/tsest/run` |
| node | Built-in | CJS | `node --experimental-strip-types node_modules/tsest/run-cjs` |

## ESM Project Setup

### 1. tsconfig.json

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

### 2. package.json

```json
{
    "type": "module",
    "scripts": {
        // Fast - No Type Checking (tsx)
        "test": "tsx node_modules/tsest/run",
        "watch": "tsx node_modules/tsest/run --watch",
        
        // Fast - No Type Checking (Node.js built-in)
        "test:node": "node --experimental-strip-types node_modules/tsest/run",
        "watch:node": "node --experimental-strip-types node_modules/tsest/run --watch",
        
        // Slower - With Type Checking (ts-node)
        "test:tsnode": "node --loader ts-node/esm node_modules/tsest/run",
        "watch:tsnode": "node --loader ts-node/esm node_modules/tsest/run --watch"
    }
}
```

## CommonJS Project Setup

### 1. tsconfig.json

```json
{
    "compilerOptions": {
        "module": "CommonJS"
    }
}
```

### 2. package.json

```json
{
    "scripts": {
        // Fast - No Type Checking (tsx)
        "test": "tsx node_modules/tsest/run-cjs",
        "watch": "tsx node_modules/tsest/run-cjs --watch",
        
        // Fast - No Type Checking (Node.js built-in)
        "test:node": "node --experimental-strip-types node_modules/tsest/run-cjs",
        "watch:node": "node --experimental-strip-types node_modules/tsest/run-cjs --watch",
        
        // Slower - With Type Checking (ts-node)
        "test:tsnode": "node -r ts-node/register node_modules/tsest/run-cjs",
        "watch:tsnode": "node -r ts-node/register node_modules/tsest/run-cjs --watch"
    }
}
```

## Installation Options

### Global Installation

```bash
# Install tsx globally
npm install -g tsx

# Install ts-node globally  
npm install -g ts-node
```

### Local Installation

```bash
# Install tsx locally
npm install --save-dev tsx

# Install ts-node locally
npm install --save-dev ts-node
```

### No Installation (Node.js built-in)

```bash
# No additional installation needed
# Use node --experimental-strip-types (still unstable)
```

## JavaScript Support

`tsest` also supports `JavaScript` files. Suffix of JavaScript test files is `.test.js`.

No need for `ts-node` or `--experimental-strip-types`.

### CommonJS JavaScript

```json
{
    "scripts": {
        "test": "node node_modules/tsest/run-cjs",  
        "watch": "node node_modules/tsest/run-cjs --watch"
    }   
}
```

### ESM JavaScript

```json
{
    "type": "module",
    "scripts": {
        "test": "node node_modules/tsest/run",
        "watch": "node node_modules/tsest/run --watch"
    }
}
```

## Notes

1. Default test file suffix is `.test.ts`
2. Use `run-cjs` for CommonJS projects or `run` for ESM projects
3. Use `ts-node` or `--experimental-strip-types` to support TypeScript
4. Currently, `--experimental-strip-types` has some issues, recommend using `ts-node` for production