// @ts-check
require('./register');
const _test = require('./wrapper');
const I = require('./assertions');
const during = require('./states');
const sel = require('./selectors');
const test = _test(global['browser']);

test(I.see(sel.bootstrapped), during.initial);
test(I.see(sel.placeholderNumberInput), during.initial);
test(I.see(sel.disabledXhrButton), during.initial);
test(I.see(sel.emptyTextField), during.initial);

// test(I.seeEn)
// test(I.dont.seeDropdown, during.initial);

// test('I see box with placeholder by default', async t => {
//     t.assert(await I.seePlaceholder(during.initial));
// });

// test('I see no dropdown by default', async t => {
//     t.assert(!await I.seeDropdown(during.initial));
// });

// test('state b has 1 as n', async t => {
//     t.assert(await assertions.x(states.b));
// })