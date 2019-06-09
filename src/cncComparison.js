const cnc = require('concordance');

module.exports = (a, b) => {
    const comp = cnc.compare(a, b);
    return comp.pass ? null : cnc.diff(a, b);
};
