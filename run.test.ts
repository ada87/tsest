// @ts-ignore
import { getTestOptions, getRunOptions } from './run.ts'; // BUG
import { test } from 'node:test'
import { equal, throws } from 'node:assert'
// node --test --watch --experimental-strip-types --test-only  "run.test.ts" 

// import { colorRed } from './color';
// https://nodejs.org/docs/latest-v22.x/api/test.html
// node --test 
// --watch
// --experimental-strip-types  
// --test-only
// --trace-warnings
// --test-name-pattern and --test-skip-pattern 
// --test-reporter=spec --test-reporter=dot --test-reporter-destination=stdout --test-reporter-destination=file.txt 



// tsc --module ESNext                                          
// tsc --module commonjs

test('getTestOptions Default', {
    // only: true
}, () => {
    var result = getTestOptions();
    equal(result.fileSuffix, '.test.ts')
    equal(result.root, process.cwd())

    result = getTestOptions([]);

    equal(result.fileSuffix, '.test.ts');
    equal(result.root, process.cwd());
    equal(result.watch, undefined);
    equal(result.only, undefined);
    equal(result.timeout, undefined);
    equal(result.forceExit, undefined);
    equal(result.concurrency, undefined);
    equal(result.testNamePatterns, undefined);
    equal(result.testSkipPatterns, undefined);
    equal(result.globPatterns, undefined);

})

test('getTestOptions', {
    // only: true
}, () => {

    console.log('--test-skip-pattern='.length)


    let result = getTestOptions(['--watch']);
    equal(result.watch, true);
    result = getTestOptions(['--watch=true']);
    equal(result.watch, true);
    result = getTestOptions(['--watch=false']);
    equal(result.watch, false);


    result = getTestOptions(['--force-exit']);
    equal(result.forceExit, true);
    result = getTestOptions(['--force-exit=abc']);
    equal(result.forceExit, true);
    result = getTestOptions(['--force-exit=false']);
    equal(result.forceExit, false);


    result = getTestOptions(['--test-only']);
    equal(result.only, true);
    result = getTestOptions(['--test-only=abc']);
    equal(result.only, true);
    result = getTestOptions(['--test-only=false']);
    equal(result.only, false);


    result = getTestOptions(['--timeout']);
    equal(result.timeout, undefined);
    result = getTestOptions(['--timeout=abc']);
    equal(result.timeout, undefined);
    result = getTestOptions(['--timeout=-111']);
    equal(result.timeout, undefined);
    result = getTestOptions(['--timeout=111']);
    equal(result.timeout, 111);

    result = getTestOptions(['--concurrency']);
    equal(result.concurrency, true);
    result = getTestOptions(['--concurrency=false']);
    equal(result.concurrency, undefined);
    result = getTestOptions(['--concurrency=true']);
    equal(result.concurrency, true);
    result = getTestOptions(['--concurrency=-1']);
    equal(result.concurrency, undefined);
    result = getTestOptions(['--concurrency=abc']);
    equal(result.concurrency, undefined);
    result = getTestOptions(['--concurrency=1']);
    equal(result.concurrency, 1);
    result = getTestOptions(['--concurrency=3']);
    equal(result.concurrency, 3);
    result = getTestOptions(['--concurrency=1000']);
    equal(result.concurrency, undefined);



    // result = getTestOptions(['--test-name-pattern="/test [4-5]/i"']);
    // console.log(result.testNamePatterns)
    // result = getTestOptions(['--test-name-pattern="/test [4-5]/i"']);
    // console.log(result.testNamePatterns)
    // result = getTestOptions(['--test-name-pattern=aaa']);
    // console.log(result.testNamePatterns)
    // result = getTestOptions(['--test-name-pattern="aaa"']);
    // console.log(result.testNamePatterns)
    // result = getTestOptions(['--test-name-pattern=/aaa/']);
    // console.log(result.testNamePatterns)
    // result = getTestOptions(['--test-name-pattern=/aaa/i']);
    // console.log(result.testNamePatterns)



    result = getTestOptions(['--test-skip-pattern']);
    equal(result.testSkipPatterns, undefined);
    result = getTestOptions(['--test-skip-pattern=(?<=\b)(?!)']);
    // equal(String(result.testSkipPatterns), String(/(?<=\b)(?!)/));;

    result = getTestOptions(['--file-suffix']);
    equal(result.fileSuffix, '.test.ts');

    result = getTestOptions(['--file-suffix=.test-spec.js']);
    equal(result.fileSuffix, '.test-spec.js');



    throws(() => getTestOptions(['--root=./folder-not-exist']));
    throws(() => getTestOptions(['--root=./index.ts']));
    equal(result.root, process.cwd());
})



test('get Files', {
    only: true
}, () => {

    const result = getRunOptions(getTestOptions(['--file-suffix=.test.ts']));
    console.log(result)
});