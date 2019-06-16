declare module 'vanad' {
    const _default: (
        title: string,
        cb: (c: import('../types/internal').Compare) => void,
        total?: number,
    ) => void;
    export = _default;
}
