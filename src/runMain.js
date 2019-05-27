const unwrapPromise = require('./unwrapPromise');
const split = require('./split');
const prepareJobExecution = require('./jobExecutionWrapper');
const loggers = require('./loggers');
const runPlugin = require('./runPlugin');

const pluginFactory = argv => {
    return state => {
        return {
            init: [() => 1, 'debug'],
        };
    };
};

/** @type {State} */
const initialState = {
    done: [],
    queued: [{ type: 'init' }],
    tracked: [],
};

/** @param {ArgVars} argv */
module.exports = async argv => {
    /** @type {Array<(state: State) => Plugin>} */
    const pluginsX = [];
    let state = initialState;

    setInterval(() => {
        const plugins = pluginsX.map(p => p(state));
        const [stillTracked, queued] = split(unwrapPromise, state.tracked);
        const nextTracked = plugins.flatMap(p => runPlugin(p, queued));

        state = {
            queued: [],
            tracked: [...stillTracked, ...nextTracked],
            done: [...state.done, ...queued],
        };
    }, 100);
};
