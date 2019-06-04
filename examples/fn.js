module.exports = () => {
    const b = document.createElement('button');
    let i = 0;
    b.textContent = 'click me';
    b.addEventListener('click', () => {
        i++;
        b.textContent = '' + i;
    });

    return b;
};
