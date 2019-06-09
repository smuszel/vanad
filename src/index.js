const logger = require('./logger');
const core = require('./core');
const cnc = require('./cncComparison');
const stackParse = require('./stackParse');

module.exports = () => core(cnc, stackParse, logger);
