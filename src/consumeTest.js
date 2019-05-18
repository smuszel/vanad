/** @type {PromiseGenConsumer<Step>} */
const consumeTest = (f, it) => new Promise(rez => {
    const acc = [];

    const inner = () => {
        it.next().then(async v => {
            !v.done && acc.push(v.value);
            !v.done && await f(v.value);
            return !v.done ? inner() : rez(acc);
        })
    }

    return inner();
});

module.exports = consumeTest;