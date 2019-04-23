import assertions from './assertions';
import states from './states';
import test from 'ava';
import * as R from 'ramda';
// inner join from ramda eliminates need for filer + includes

const I = R.map(R.then)(assertions);
const during = R.map(R.then(f => f(browser)))(states);

test('I see box with placeholder by default', async t => {
    t.assert(await I.seePlaceholder(during.initial));
});

test('I see no dropdown by default', async t => {
    t.assert(!await I.seeDropdown(during.initial));
});

// test('state b has 1 as n', async t => {
//     t.assert(await assertions.x(states.b));
// })