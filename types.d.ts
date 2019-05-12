// declare type keysOf = (obj: object) =>
// declare type KeysOf<T> = { [K in keyof T]: K }
declare function _keysOf<T>(obj: T) { 
    const x: { [K in keyof T]: K } = {};
    return x;
}