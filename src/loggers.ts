import { Logger, Verbosity } from '../types/internal';

const loggers: Record<Verbosity, Logger> = {
    full: comparisonResult => console.log(JSON.stringify(comparisonResult)),
    basic: comparisonResult => {
        if (comparisonResult.diff) {
            console.log(comparisonResult.title);
            console.log(comparisonResult.callers[2]);
            console.log(comparisonResult.diff);
            process.exit(1);
        }
    },
};

export default loggers;
