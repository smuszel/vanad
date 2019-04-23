const selectors = require('./selectors');

module.exports = {
    seePlaceholder: page => page.$(selectors.emptyInputBox),
    seeDropdown: page => page.$(selectors.dropdown)
};
