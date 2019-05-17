const a = async function* () {
    yield 1
    await new Promise(rez => setTimeout(rez, 400));
    yield 2
    await new Promise(rez => setTimeout(rez, 100));
    yield 3
}

const consume = (f, it) => {
    const inner = () => {
        it.next().then(v => {
            !v.done && f(v.value);
            return !v.done && inner();
        })
    } 

    return inner;
}

consume(console.log, a())()