const test = require('../src/index')();

test('Should pass', c => {
    c(1, 1);
});

test('Should fail', c => {
    c(1, 2);
});
