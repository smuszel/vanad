const chalk = require('../node_modules/chalk/index');
const { assert } = require('../devUtil');
const { renderAdvancedMessageRecord, renderBasicMessageRecord } = require('../src/util');

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
