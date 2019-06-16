import logger from './loggers';
import core from './core';
import comparisonEngine from './cncComparison';
import stackParser from './stackParser';

export const test = core({ comparisonEngine, stackParser, logger });
export default test;
