module.exports = (() => {
    /**@type {any}*/
    const res = {}
    const opt = require('dotenv').config().parsed;
    Object.keys(opt).forEach(mainKey => {
        const [fk, sk] = mainKey.split('.');
        if (sk) {
            res[fk] = res[fk] || {};
            res[fk][sk] = opt[mainKey];
        } else {
            res[fk] = opt[mainKey];
        }
    });

    return res;
})();