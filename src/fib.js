const _fib = v => {
    return v < 2 ? Math.max(v, 0) : _fib(v - 1) + _fib(v - 2);
};

export default _fib;