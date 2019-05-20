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
