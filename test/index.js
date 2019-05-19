const { runChild, matches } = require('./util');

const snapshot = [
    'started: pass.spec.js\n',
    'started: fail.spec.js\n',
    'pass.spec.js > I arrived at the page \n',
    'fail.spec.js > I arrived at the page \n',
    'pass.spec.js > I clicked xhr button for the first time \n',
    'fail.spec.js > I clicked xhr button again fails for textarea:disabled\n',
    'fail.spec.js > I waited for text \n',
    'pass.spec.js > I waited for text \n',
    'fail.spec.js > I clicked xhr button again \n',
    'finished: fail.spec.js\n',
    'pass.spec.js > I clicked xhr button again \n',
    'finished: pass.spec.js\n'
];

runChild('node ./test/serverSetup.js')
runChild('node ./bin/cli -v basic -d -m headless').then(xs => {
    const pass = matches(snapshot, xs);
    !pass && console.log(snapshot, xs);
    process.exit(pass ? 0 : 1);
});