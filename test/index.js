const { runChild, matches } = require('./util');

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

runChild('node ./test/serverSetup.js')
runChild('node ./bin/cli -v basic -d -m headless').then(xs => {
    !matches(snapshot, xs) && console.log(snapshot, xs);
    process.exit();
})