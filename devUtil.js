const eq = require('util').isDeepStrictEqual;
const _render = require('util').inspect;
const render = x => _render(x, { depth: 4, colors: true, compact: true });

Array.prototype.map;
/** @type {Assert} */
const assert = (f, xs) => {
    xs.forEach(async (gt, ix) => {
        const exp = gt[1];
        const result = await f(...gt[0]);
        const msg = `[${ix}]: ${render(result)} should be ${render(exp)}`;
        const ok = eq(result, exp);

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
        child.on('exit', () => {
            rez(out);
        });
    });
