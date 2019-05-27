const chalk = require('../node_modules/chalk/index');
const { assert } = require('../devUtil');
const { renderAdvancedMessageRecord, renderBasicMessageRecord } = require('../src/util');

// /** @type {(x: number) => (y: number) => string} */
// const f = x => y => '' + x + y;
// assert(f, [[[1, 2], '12']]);

// /** @type {(x: number) => (y: number, z: string) => Promise<() => Promise<string>>} */
// const g = x => (y, z) =>
//     Promise.resolve(() => new Promise(rez => setTimeout(() => rez(z + x + y), 100)));
// assert(g, [[[1, 2, '3'], '312']]);

// assert(renderAdvancedMessageRecord, [
//     [[chalk, 'a', [], '#'], 'a #'],
//     [[chalk, 'a', ['testStart'], '#'], 'a #'],
//     [[chalk, 'a', ['testStart', 'stepSuccess'], '#'], 'a . #'],
//     [[chalk, 'a', ['testStart', 'stepSuccess', 'stepSuccess'], '#'], 'a . . #'],
//     [[chalk, 'a', ['testStart', 'stepSuccess', 'testEnd'], '#'], chalk.green('a')],
//     [[chalk, 'a', ['testStart', 'stepFailure'], '#'], chalk.red('a 0')],
//     [[chalk, 'a', ['testStart', 'stepSuccess', 'stepFailure'], '#'], chalk.red('a 1')],
//     [[chalk, 'a', ['testStart', 'stepSuccess', 'stepFailure', 'testEnd'], '#'], chalk.red('a 1')],
// ]);

// assert(renderBasicMessageRecord, [
//     [['a', []], ''],
//     [['a', ['testStart']], ''],
//     [['a', ['testStart', 'stepSuccess', 'testEnd']], ''],
//     [['a', ['testStart', 'stepFailure', 'testEnd']], 'a 0'],
//     [['a', ['testStart', 'stepFailure', 'testEnd']], 'a 0'],
//     [['a', ['testStart', 'stepSuccess', 'stepFailure', 'testEnd']], 'a 1'],
// ]);

// const afterInit =

// ;

// 'Has init event moved to registered': [
//     [[], init()],
//     { registered: [{ type: 'init' }], enqueued: [] },
// ],
// 'On event executes function matching key in middleware': [
//     [[{ init: [() => (glb.a = 1)] }], init()],
//     { registered: [{ type: 'init' }], enqueued: [] },
//     () => glb.a === 1,
// ],
// 'Return of that execution creates new event if type is specified': [
//     [[{ init: [() => undefined, 'debug'] }], init()],
//     { registered: [{ type: 'init' }, { type: 'debug' }], enqueued: [] },
// ],
// 'Return is passed to value if it is defined': [
//     [[{ init: [() => null, 'debug'] }], init()],
//     { registered: [{ type: 'init' }, { type: 'debug', value: null }], enqueued: [] },
// ],
// 'Returned value from middleware func is awaited': [
//     [[{ init: [() => new Promise(rez => setTimeout(() => rez(1), 10)), 'debug'] }], init()],
//     { registered: [{ type: 'init' }, { type: 'debug', value: 1 }], enqueued: [] },
// ],
// 'Awaited undefined does not trigger event': [
//     [
//         [{ init: [() => new Promise(rez => setTimeout(() => rez(undefined), 100)), 'debug'] }],
//         init(),
//     ],
//     {
//         registered: [{ type: 'init' }, { type: 'debug' }, { type: 'stepSuccess' }],
//         enqueued: [],
//     },
// ],
// [
//     [[{ init: [() => Promise.resolve(undefined), 'debug'] }]],
//     [{ type: 'init' }, { type: 'debug' }],
// ],
// // Events from middleware execution trigger other middleware
// [
//     [
//         [
//             { init: [() => Promise.resolve(1), 'debug'] },
//             { debug: [value => Promise.resolve(value + 1), 'testStart'] },
//         ],
//     ],
//     [{ type: 'init' }, { type: 'debug', value: 1 }, { type: 'testStart', value: 2 }],
// ],
