/** @type {(x: number, y: number) => number} */
const add = (x, y) => {
    return x + y;
};

/** @type {UnitTest<{}>} */
module.exports = async function*() {
    yield '3 + 4 is 7';
    yield add(3, 4) === 7;
    yield 'unstable step';
    await new Promise(rez => setTimeout(rez, 1000));
    // abc();
    // throw 'boom';

    yield '4 + 3 is 8';
    await new Promise(rez => setTimeout(rez, 3000));
    yield add(4, 3) === 8;
    await new Promise(rez => setTimeout(rez, 3000));
};
