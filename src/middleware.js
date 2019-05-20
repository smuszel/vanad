const messageMap = require('./messages');

/** @type {Dict<VerbosityLevel, OptDict<MessageType, StdoutRender> | null>} */
module.exports.logger = {
    bare: Object.keys(messageMap).reduce((acc, k) => {
        return { ...acc, [k]: () => console.log(k) };
    }, {}),
    debug: Object.keys(messageMap).reduce((acc, k) => {
        return { ...acc, [k]: value => console.log(`${k} : ${JSON.stringify(value)}`) };
    }, {}),
    silent: null,
};
