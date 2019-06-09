export default (comparisonEngine, stackParser, logger) => {
    const compare = title => (a, b) => {
        const diff = comparisonEngine(a, b);
        const caller = stackParser(new Error());
        const message = { caller, diff, title };
        logger(message);
    };
    return (title, cb) => {
        try {
            cb(compare(title));
        } catch (err) {
            const caller = stackParser(err);
            logger({ diff: err.message, caller, title });
        }
    };
};
