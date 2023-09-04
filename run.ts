import { start } from './start'
import { watch } from './watch'

const cmd = process.argv[process.argv.length - 1];
if (cmd == '--watch' || cmd == '-w') {
    watch();
} else {
    start();
}