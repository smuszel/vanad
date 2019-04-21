import assertions from './assertions';
import states from './states';
import test from 'ava';

test('state a has 1 as n', async t => {
    t.assert(await assertions.x(states.a));
})

// test('state b has 1 as n', async t => {
//     t.assert(await assertions.x(states.b));
// })