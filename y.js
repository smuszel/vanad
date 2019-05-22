const xs = [1, 2, 3, 4, 5, 6, 7, 8];
const pool = 2;
const worker = n => {
    return new Promise(rez => setTimeout(() => rez(n + ''), 1000));
};

const f = async function*() {
    const availableIxs = xs.map((_, ix) => ix);
    const currentIxs = availableIxs.splice(0, pool);
    const ps = currentIxs.map(ix => {
        const p = worker(xs[ix]).then(value => ({ value, ix }));
        return { p, ix };
    });

    while (ps.length) {
        const a = await Promise.race(ps.map(x => x.p));
        const resolvedIx = ps.findIndex(x => x.ix === a.ix);
        const ix = availableIxs.shift();

        if (ix) {
            const p = worker(xs[ix]).then(value => ({ value, ix }));
            const el = { ix, p };

            ps.splice(resolvedIx, 1, el);
        } else {
            ps.splice(resolvedIx, 1);
        }

        yield a.value;
    }
};

const main = async () => {
    for await (const x of f()) {
        console.log(x);
    }
};
main();
