import fib from './fib.js';

export const listen = dom => {
    const inputNode = dom.querySelector('#fib-arg');
    const button = dom.querySelector('#fib-calc');
    const setter = setDisplayed(dom);
    let val = +inputNode.value;

    inputNode.addEventListener('input', ev => {
        val = +inputNode.value;
    });

    button.addEventListener('click', () => setter(val));
}

export const setDisplayed = dom => {
    const answerNode = dom.querySelector('#fib-answer');

    return val => {
        answerNode.innerText = fib(val).toString();
    };
};

export const getDisplayed = dom => {
    const answerNode = dom.querySelector('#fib-answer');

    return () => answerNode.innerText;
}