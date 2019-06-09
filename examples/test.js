const t = require('../index')();
const fn = require('./fn');

t('Has text click me', t => {
    const btn = fn();
    const txt = btn.textContent;
    t(txt, 'click me');
});

t('Displays number of times being clicked', t => {
    const btn = fn();
    btn.click();
    const txt = btn.textContent;
    t(txt, '1');
    btn.click();
    const txt2 = btn.textContent;
    t(txt2, '2');
});
