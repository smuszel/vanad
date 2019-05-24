/** @param {string} name */
/** @param {MessageType[]} messages */
/** @param {string} spiner */
module.exports.renderMessageRecord = (name, messages, spiner) => {
    const _dots = messages.filter(x => x === 'stepSuccess').map(() => '.');
    let dots;
    let fix;

    if (messages.includes('stepFailure')) {
        fix = '!';
        dots = _dots;
    } else if (messages.includes('testEnd')) {
        fix = '✅';
        dots = [];
    } else {
        fix = spiner;
        dots = _dots;
    }

    const result = [name, ...dots, fix].join(' ');

    return result;
};
