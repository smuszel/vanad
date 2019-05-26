const chalk = require('../node_modules/chalk/index');
const { assert } = require('../devUtil');
const { renderAdvancedMessageRecord, renderBasicMessageRecord } = require('../src/util');
const Computation = require('../src/Computation');
const glb = {
    a: 0,
};

assert(renderAdvancedMessageRecord, [
    [[chalk, 'a', [], '#'], 'a #'],
    [[chalk, 'a', ['testStart'], '#'], 'a #'],
    [[chalk, 'a', ['testStart', 'stepSuccess'], '#'], 'a . #'],
    [[chalk, 'a', ['testStart', 'stepSuccess', 'stepSuccess'], '#'], 'a . . #'],
    [[chalk, 'a', ['testStart', 'stepSuccess', 'testEnd'], '#'], chalk.green('a')],
    [[chalk, 'a', ['testStart', 'stepFailure'], '#'], chalk.red('a 0')],
    [[chalk, 'a', ['testStart', 'stepSuccess', 'stepFailure'], '#'], chalk.red('a 1')],
    [[chalk, 'a', ['testStart', 'stepSuccess', 'stepFailure', 'testEnd'], '#'], chalk.red('a 1')],
]);

assert(renderBasicMessageRecord, [
    [['a', []], ''],
    [['a', ['testStart']], ''],
    [['a', ['testStart', 'stepSuccess', 'testEnd']], ''],
    [['a', ['testStart', 'stepFailure', 'testEnd']], 'a 0'],
    [['a', ['testStart', 'stepFailure', 'testEnd']], 'a 0'],
    [['a', ['testStart', 'stepSuccess', 'stepFailure', 'testEnd']], 'a 1'],
]);

/** @param {Middleware[]} middleware */
const computationConstruction = middleware => {
    const c = new Computation(middleware);
    return c.history.map(x => {
        return { type: x.type, }
    });
};

assert(computationConstruction, [
    // Has init event
    [[[]], [{ type: 'init' }]],
    // On event executes function matching key in middleware
    [[[{ init: [() => (glb.a = 1)] }]], [{ type: 'init' }], () => glb.a === 1],
    // Return of that execution creates new event if type is specified
    [[[{ init: [() => undefined, 'debug'] }]], [{ type: 'init' }, { type: 'debug' }]],
    // Return is passed to value if it is defined
    [[[{ init: [() => null, 'debug'] }]], [{ type: 'init' }, { type: 'debug', value: null }]],
    // Returned value from middleware func is awaited
    [
        [[{ init: [() => Promise.resolve(null), 'debug'] }]],
        [{ type: 'init' }, { type: 'debug', value: null }],
    ],
    // Awaited undefined does not trigger event
    [
        [[{ init: [() => Promise.resolve(undefined), 'debug'] }]],
        [{ type: 'init' }, { type: 'debug' }],
    ],
    // Events from middleware execution trigger other middleware
    [
        [
            [
                { init: [() => Promise.resolve(1), 'debug'] },
                { debug: [value => Promise.resolve(value + 1), 'testStart'] },
            ],
        ],
        [{ type: 'init' }, { type: 'debug', value: 1 }, { type: 'testStart', value: 2 }],
    ],
]);
