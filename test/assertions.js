const selectors = require('./selectors');
const { addNameMeta } = require('./util');
const R = require('ramda');

const basic = {
    seePlaceholder: page => page.$(selectors.emptyInputBox),
    seeDropdown: page => page.$(selectors.dropdown),
};
addNameMeta(basic);

/** @type {typeof basic} */
const negated = R.map(f => p => f(p).then(x => !x), basic);
addNameMeta(negated, 'dont ');

module.exports = {
    ...basic,
    dont: negated
};

// addNameMeta(module.exports);
// addNameMeta(module.exports.dont);