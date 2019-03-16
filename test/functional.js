import * as handler from '../src/handler';
import test from 'ava';
import { JSDOM } from 'jsdom';
import fib from '../src/fib';

const ctx = new JSDOM(`
    <body>
        <input type="text" id="fib-arg">
        <button id="fib-calc"></button>
        <span id="fib-answer"></span>
    </body>
`);

test('handler displays fib result on input change', (t) => {
    const val = 7;
    const dom = ctx.window.document;
    
    handler.setDisplayed(dom)(val);
    const displayed = handler.getDisplayed(dom)();
    t.is(displayed, fib(val).toString());
});