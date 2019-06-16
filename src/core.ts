import { RuntimeOptions, Compare } from '../types/internal';

export default ({ comparisonEngine, stackParser, logger }: RuntimeOptions) => {
    const compare: (title: string, total: number) => Compare = (title, total) => (
        a,
        b,
    ) => {
        const diff = comparisonEngine(a, b);
        const callers = stackParser(new Error());
        logger({ callers, diff, title, total });
        return diff;
    };

    return (title: string, cb: (c: Compare) => void, total = 1) => {
        cb(compare(title, total));
    };
};
