import { Logger, Verbosity } from '../types/internal';

const loggers: Record<Verbosity, Logger> = {
    process: comparisonResult => {
        const send = process.send;
        send && send(comparisonResult);
    },
    basic: comparisonResult => {
        if (comparisonResult.diff) {
            console.log(comparisonResult.title);
            console.log(comparisonResult.callers[2]);
            console.log(comparisonResult.diff);
        }
    },
    ensure: comparisonResult => {
        if (comparisonResult) {
            process.exit(1);
        }
    },
};

export default loggers;
