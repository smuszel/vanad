// const execMiddleware = message => {
//     return middleware.map(mw => {
//         const [f, type] = mw[message.type] || [() => null, undefined];
//         const value = f(message.value);
//         let msg;

//         if (type && value !== undefined) {
//             msg = { type, value };
//         } else if (type) {
//             msg = { type };
//         }

//         return msg;
//     });
// };
/** @type {(plugin: Plugin, messages: Message[]) => Message[]} */
module.exports = (plugin, messages) => {
    return [];
};

// return state => {
//     const [toProcess, toLeave] = unasync(state.enqueued);
//     /** @type {AsyncWrapper<Message>[]} */
//     //@ts-ignore
//     const next = toProcess.flatMap(execMiddleware).filter(Boolean);
//     const [toRegister, toEnqueue] = unasync(next);

//     return
// };
// /** @param {Message} message */

// /** @param {Message?} msg */
// const updateHistory = msg => {
//     if (msg) {
//         _history.push(msg);
//         execMiddleware(msg);
//     }
// };
