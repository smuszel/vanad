module.exports = x => {
    if (x.value instanceof Promise) {
        return { ...x, value: 1 };
    }
};
