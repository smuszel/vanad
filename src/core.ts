import { RuntimeOptions, Compare } from '../types/internal';

export default ({ comparisonEngine, stackParser, logger }: RuntimeOptions) => {
    const compare: (title: string) => Compare = title => (a, b) => {
        const diff = comparisonEngine(a, b);
        const callers = stackParser(new Error());
        const message = { callers, diff, title };
        logger(message);
        return diff;
    };

    return (title: string, cb: (c: Compare) => void) => {
        cb(compare(title));
    };
};
