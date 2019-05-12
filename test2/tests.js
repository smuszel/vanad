const states = require('./states');
const selectors = require('./selectors');

/** @type {typeof _keysOf} */
const keysOf = obj => {
    const res = {};
    Object.keys(obj).forEach(k => res[k] = k);

    return res
};

const labels = keysOf(states);

module.exports = {
    [labels.initial]: selectors.button,
    [labels.afterClick]: [selectors.textResponse, selectors.disabledButton]
}