// @ts-check
import _test from './wrapper';
import I from './assertions';
import during from './states';

const test = _test(global['browser']);

test(I.seePlaceholder, during.initial);
test(I.dont.seeDropdown, during.initial);

// test('I see box with placeholder by default', async t => {
//     t.assert(await I.seePlaceholder(during.initial));
// });

// test('I see no dropdown by default', async t => {
//     t.assert(!await I.seeDropdown(during.initial));
// });

// test('state b has 1 as n', async t => {
//     t.assert(await assertions.x(states.b));
// })