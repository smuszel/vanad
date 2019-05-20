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
    'finished: pass.spec.js\n',
];

runChild('node ./test/serverSetup.js');
const threads = runChild('node ./bin/cli -v basic -m headless -t 2');
const noThreads = runChild('node ./bin/cli -v basic -m headless');

Promise.all([threads, noThreads]).then(([txs, nxs]) => {
    const t = matches(snapshot, txs);
    const n = matches(snapshot, nxs);
    const pass = t && n;
    !pass && console.log(snapshot, t, n);
    process.exit(pass ? 0 : 1);
});
