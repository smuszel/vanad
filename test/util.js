module.exports.addNameMeta = (obj, pref) => {
    Reflect.ownKeys(obj).forEach(k => {
        const value = `${pref || ''}${k}`;
        Reflect.defineProperty(obj[k], '__NAME__', { value });
    });

    return obj;
};