/** @type {(tracked: Message[]) => [Message[], Message[]]} */
module.exports = tracked => {
    return [tracked, []];
};
