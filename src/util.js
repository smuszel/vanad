const successLength = messages => messages.filter(x => x === 'stepSuccess').length;

/** @param {any} colorizer */
/** @param {string} name */
/** @param {MessageType[]} messages */
/** @param {string} spiner */
module.exports.renderAdvancedMessageRecord = (colorizer, name, messages, spiner) => {
    let colorize;
    let fix;

    if (messages.includes('stepFailure')) {
        fix = successLength(messages);
        colorize = colorizer.red;
    } else if (messages.includes('testEnd')) {
        fix = '';
        colorize = colorizer.green;
    } else {
        fix = '. '.repeat(successLength(messages)) + spiner;
        colorize = x => x;
    }

    const result = colorize((name + ' ' + fix).trim());

    return result;
};

/** @param {string} name */
/** @param {MessageType[]} messages */
module.exports.renderBasicMessageRecord = (name, messages) => {
    let msg;

    if (messages.includes('stepFailure')) {
        msg = name + ' ' + messages.filter(m => m === 'stepSuccess').length;
    } else {
        msg = '';
    }

    return msg;
};
