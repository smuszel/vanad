import assertions from './assertions';
import states from './states';
import test from 'ava';

test('I see box with placeholder by default', async t => {
    t.truthy(await assertions.seePlaceholder(await states.initial));
});

test('I see no dropdown by default', async t => {
    t.falsy(await assertions.seeDropdown(await states.initial));
});

// test('state b has 1 as n', async t => {
//     t.assert(await assertions.x(states.b));
// })