const { assert } = require('../../devUtil');
const f = require('../../src/unwrap');
const x = new Promise(rez => setTimeout(rez, 10000));
assert(f, [
    [[[]], [[], []]],
    [[[{ type: 'init' }]], [[], [{ type: 'init', value: undefined }]]],
    [[[{ type: 'init', value: 1 }]], [[], [{ type: 'init', value: 1 }]]],
    [
        [[{ type: 'init', value: 1 }, { type: 'init', value: x }]],
        [[{ type: 'init', value: x }], [{ type: 'init', value: 1 }]],
    ],
    [[[]], [[], []]],
    [[[]], [[], []]],
]);
