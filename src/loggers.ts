import { Logger } from '../types/internal';

const logger: Logger = message => {
    if (process.send) {
        process.send(message);
    } else if (message.diff) {
        console.log(message.title);
        console.log(message.callers[1]);
        console.log(message.diff);
        process.exit(1);
    }
};

export default logger;
