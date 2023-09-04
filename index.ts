import { RUN } from './tsest';

const cmd = process.argv[process.argv.length - 1];
const watch = cmd == '--watch' || cmd == '-w'
RUN({ watch })