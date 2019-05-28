/** @type {(messages: Message[]) => [Message[], Message[]]} */
module.exports = messages => {
    const pending = [];
    const diff = [];

    messages.forEach(m => {
        let rv;
        if (m.value && m.value.__) {
            rv = [m.value.__.__];
        } else if (m.value instanceof Promise) {
            m.value.then(__ => (m.value.__ = { __ }));
            rv = [];
        } else {
            rv = [m.value];
        }

        rv.length ? diff.push({ ...m, value: rv[0] }) : pending.push(m);
    });

    return [pending, diff];
};
