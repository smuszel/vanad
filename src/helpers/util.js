/** @param {any} colorizer */
/** @param {Progress} progress */
/** @param {string} spiner */
module.exports.renderAdvancedMessageRecord = (colorizer, progress, spiner) => {
    let colorize;
    let fix;

    if (progress.failed) {
        fix = progress.step;
        colorize = colorizer.red;
    } else if (progress.finished) {
        fix = '';
        colorize = colorizer.green;
    } else {
        fix = '. '.repeat(progress.step) + spiner;
        colorize = x => x;
    }

    const result = (progress.job.name + ' ' + fix).trim();

    return colorize(result);
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
