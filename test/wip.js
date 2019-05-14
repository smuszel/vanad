const states = require('./states');
const sx = require('./selectors');

module.exports = [
    {
        description: 'When I arrive',
        resolver: states.initial,
        selectors: [sx.button]
    },
    {
        description: 'After I click xhr button',
        resolver: states.afterClick,
        selectors: [sx.textResponse, sx.disabledButton]
    },
];

// use workers
// refactor runner
// configuraeble .env
// selector util lib
// modes of output

// const lift = xs => {
//     return Array.isArray(xs) ? xs : Array.of(xs);
// }