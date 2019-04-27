const test = require('ava');
const cache = {};

module.exports = browser => (assertion, stateFactory) => {
    const name = stateFactory.__NAME__;
    const title = `I ${assertion.__NAME__} during ${name}`;
    const state = cache[name] || browser.then(b => stateFactory(b));
    const f = async t => {
        t.assert(await assertion(await state));
    };

    cache[name] = state;
    test(title, f);
};