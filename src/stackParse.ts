const callerRegex = /\s\(?(\S+):(\d+):(\d+)\)?$/;
const internalsRegex = /^internal\//;

const createCaller = matches => ({
    path: matches[1],
    line: +matches[2],
});

const parseLine = line => {
    const matches = line.match(callerRegex);
    return matches ? createCaller(matches) : matches;
};

export default ({ stack }) => {
    return (stack || '')
        .split('\n')
        .map(line => {
            const caller = line && parseLine(line);
            const res = caller && !internalsRegex.test(caller.path) ? caller : null;
            return res;
        })
        .filter(Boolean);
};
