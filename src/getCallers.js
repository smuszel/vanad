Error.prepareStackTrace = (err, callSites) => {
    const callers = callSites.map(cs => ({
        filePath: cs.getFileName(),
        line: cs.getLineNumber(),
    }));
    Reflect.defineProperty(callers, '__original', { value: err });

    return callers;
};

/** @returns {Caller[]} */
//@ts-ignore
module.exports = () => new Error().stack;
