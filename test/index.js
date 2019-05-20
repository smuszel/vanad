const { runChild, matches } = require('./util');

const snapshot = [
    'jobRequest : {"type":"jobRequest","value":{"data":{},"name":"fail.spec.js","path":"C:\\\\Users\\\\jkomm\\\\Desktop\\\\tdd-example\\\\test\\\\fail.spec.js"}}\n',
    'jobRequest : {"type":"jobRequest","value":{"data":{},"name":"pass.spec.js","path":"C:\\\\Users\\\\jkomm\\\\Desktop\\\\tdd-example\\\\test\\\\pass.spec.js"}}\n',
    'testStart : {"type":"testStart"}\n',
    'testStart : {"type":"testStart"}\n',
    'stepSuccess : {"type":"stepSuccess"}\n',
    'stepSuccess : {"type":"stepSuccess"}\n',
    'stepFailure : {"type":"stepFailure"}\n',
    'stepSuccess : {"type":"stepSuccess"}\n',
    'stepSuccess : {"type":"stepSuccess"}\n',
    'stepSuccess : {"type":"stepSuccess"}\n',
    'stepSuccess : {"type":"stepSuccess"}\n',
    'stepSuccess : {"type":"stepSuccess"}\n',
    'testEnd : {"type":"testEnd"}\n',
    'testEnd : {"type":"testEnd"}\n',
];

runChild('node ./test/serverSetup.js');
const threads = runChild('node ./bin/cli -v debug -m headless -t 2');
const noThreads = runChild('node ./bin/cli -v debug -m headless');

Promise.all([threads, noThreads]).then(([txs, nxs]) => {
    const t = matches(snapshot, txs);
    const n = matches(snapshot, nxs);
    const pass = t && n;
    !pass && console.log(snapshot, txs, nxs);
    process.exit(pass ? 0 : 1);
});
