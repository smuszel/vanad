const cn = require('../src/classNames');
const dot = str => `.${str}`;
const { map } = require('ramda');

/** @type {typeof cn} */
const dotted = map(dot, cn);
const derived = {
    disabledXhrButton: dotted.xhrButton + ':disabled',
    enabledXhrButton: dotted.xhrButton + ':not(:disabled)',
    disabledNumberInput: dotted.numberInput + ':disabled',
    enabledNumberInput: dotted.xhrButton + ':not(:disabled)',
    placeholderNumberInput: dotted.numberInput + ':placeholder-shown',
    emptyTextField: dotted.textField + ':empty',
    filledTextField: dotted.textField + ':not(:empty)'
};

module.exports = { ...dotted, ...derived };