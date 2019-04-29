const cache = {};
let n = 0;

const test = (title, f) => {
    f(v => {
        if (v) {
            n++
        } else {
            throw `test failed ${title}`;
        }
    }).then(() => console.log(n));
}

module.exports = browser => (pair, stateFactory) => {
    const [assertion, titleFrag] = pair;
    const name = stateFactory.__NAME__;
    const title = `${titleFrag} during ${name}`;
    const state = cache[name] || browser.then(b => stateFactory(b));
    const f = async assert => assert(await assertion(await state));

    cache[name] = state;
    test(title, f);
};