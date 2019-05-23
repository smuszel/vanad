/** @type { any} */
const render = () => {};

const test = () => {
    console.assert(render([]) === '');
    console.assert(render([{ type: 'testStart', data: { name: 'a' } }]) === 'a');
    console.assert(
        render([
            { type: 'testStart', data: { name: 'a' } },
            { type: 'stepSuccess', data: { name: 'a' } },
        ]) === 'a :spinner:',
    );
};
