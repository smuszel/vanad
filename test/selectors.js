const cn = require('../src/classNames');
const dot = str => `.${str}`;

module.exports = {
    reactRoot: 'div',
    component: dot(cn.component),
    inputBox: dot(cn.inputBox),
    emptyInputBox: dot(cn.inputBox) + ':placeholder-shown',
    dropdown: dot(cn.dropdown)
}