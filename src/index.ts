import {analyzeTreeShake} from './tree-shaker';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
    .option('input', {
        type: 'string',
        describe: 'Path to the input file to analyze',
        demandOption: true,
    })
    .help()
    .parse();

const inputFile = argv.input;

analyzeTreeShake(inputFile);