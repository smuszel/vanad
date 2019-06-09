import logger from './logger';
import core from './core';
import cnc from './cncComparison';
import stackParse from './stackParse';

export default () => core(cnc, stackParse, logger);
