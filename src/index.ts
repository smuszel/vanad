import logger from './loggers';
import core from './core';
import comparisonEngine from './cncComparison';
import stackParser from './stackParser';

export default core({ comparisonEngine, stackParser, logger });
