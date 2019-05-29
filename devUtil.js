const eq = require('util').isDeepStrictEqual;
const _render = require('util').inspect;
const render = x => _render(x, { depth: 4, colors: true, compact: true });

Array.prototype.map;
/** @type {Assert} */
const assert = (curriedFn, xs) => {
    Object.keys(xs).forEach(async k => {
        const gt = xs[k];
        const exp = gt[1];
        const args = gt[0];
        const execCurried = async (fn, ix = 0) => {
            const l = fn.length;
            const res = await fn(...args.slice(ix, ix + l));
            return typeof res === 'function' ? await execCurried(res, l) : res;
        };
        const result = await execCurried(curriedFn);
        const msg = `[${k}]: ${render(result)} should be ${render(exp)}`;
        const ok = eq(result, exp) && (gt[2] ? gt[2]() : true);

        !ok && console.log(msg);
    });
};

module.exports.assert = assert;
module.exports.matches = (xs, ys) => {
    return xs.every(x => ys.includes(x)) && xs.length === ys.length;
};

module.exports.runChild = command =>
    new Promise(rez => {
        const cp = require('child_process');

        const child = cp.exec(command);
        const out = [];
        child.stdout && child.stdout.on('data', d => out.push(d.toString()));
        child.on('error', err => {
            rez([err, out]);
        });
        child.on('exit', () => {
            rez(['', out]);
        });
    });
