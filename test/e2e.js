const { runChild, matches } = require('../devUtil');

runChild('node ./examples/backend.js');
const threads = runChild('node ./bin/cli ./examples/**/*.spec.js -v debug -m headless -t 2');
const noThreads = runChild('node ./bin/cli ./examples/**/*.spec.js -v debug -m headless');

const main = async () => {
    setInterval(() => {
        console.log(threads);
    }, 2000);
    const xs = await threads;
    console.log(xs);
    const ys = await noThreads;
    console.log(ys);
};

main();
