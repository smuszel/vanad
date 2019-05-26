const { EventEmitter } = require('events');

class Computation extends EventEmitter {
    /** @param {Middleware[]} middleware */
    constructor(middleware) {
        super();
        /** @type {Message} */
        const init = { type: 'init', settled: false };
        this._history = [init];
        this.middleware = middleware;
        this.execMiddleware(init);
    }

    /** @param {Message} message */
    execMiddleware(message) {
        this.middleware.forEach(async mw => {
            const [f, type] = mw[message.type] || [() => null, undefined];
            const value = await f(message.value, this);
            let msg;

            if (type && value !== undefined) {
                msg = { type, value };
            } else if (type) {
                msg = { type };
            }

            this.updateHistory(msg);
        });
    }

    get history() {
        return this._history;
    }

    get lastHistory() {
        return this._history[this._history.length - 1];
    }

    /** @param {Message | undefined} msg */
    updateHistory(msg) {
        if (msg) {
            // msg.settled = false;
            this._history.push(msg);
            this.execMiddleware(msg);
        }
    }
}

module.exports = Computation;
