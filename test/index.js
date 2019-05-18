const cp = require('child_process');
const out = [];
const child = cp.exec('node ./bin/cli -v basic -d -m headless');

const snapshot = [
    'started: fail.spec.js\n',
    'started: pass.spec.js\n',
    'started: google.spec.js\n',
    'fail.spec.js > I arrived at XYZ \n',
    'pass.spec.js > I arrived at XYZ \n',
    'pass.spec.js > I clicked xhr button \n',
    'fail.spec.js > I clicked xhr button fails for textarea\n',
    'finished: pass.spec.js\n',
    'finished: fail.spec.js\n',
    'google.spec.js > When I arrive at google \n',
    'finished: google.spec.js\n'
];

const matchSnapshot = () => {
    return snapshot.every(ln => out.includes(ln));
}

child.stdout.on('data', d => out.push(d.toString()));
child.on('exit', () => {
    const pass = matchSnapshot();
    !pass && console.log(snapshot, out);
    process.exit();
})