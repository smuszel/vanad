import cnc from 'concordance';

export default (a, b) => {
    const comp = cnc.compare(a, b);
    return comp.pass ? null : cnc.diff(a, b);
};
