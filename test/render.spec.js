const { assert } = require('../devUtil');
const f = require('../src/util').renderMessageRecord;

assert(f, [
    [['a', [], '#'], 'a #'],
    [['a', ['testStart'], '#'], 'a #'],
    [['a', ['testStart', 'stepSuccess'], '#'], 'a . #'],
    [['a', ['testStart', 'stepSuccess', 'stepSuccess'], '#'], 'a . . #'],
    [['a', ['testStart', 'stepSuccess', 'testEnd'], '#'], 'a ✅'],
    [['a', ['testStart', 'stepFailure'], '#'], 'a !'],
    [['a', ['testStart', 'stepSuccess', 'stepFailure'], '#'], 'a . !'],
    [['a', ['testStart', 'stepSuccess', 'stepFailure', 'testEnd'], '#'], 'a . !'],
]);
