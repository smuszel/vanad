import cnc from 'concordance';
import { Compare } from '../types/internal';

const cncCompare: Compare = (a, b) => {
    const comp = cnc.compare(a, b);
    return comp.pass ? null : cnc.diff(a, b);
};

export default cncCompare;
