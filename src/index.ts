import loggers from './loggers';
import core from './core';
import comparisonEngine from './cncComparison';
import stackParser from './stackParser';

const logger = loggers[global['verbosity'] || 'basic'];

export default core({ comparisonEngine, stackParser, logger });
