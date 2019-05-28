/** @type {Selector<Progress[]>} */
const progressSelector = (done, diff) => {
    /** @type {Map<string, Progress>} */
    const progressMap = new Map();
    [...done, ...diff].forEach(m => {
        if (m.type === 'jobScheduled') {
            m.value.forEach(job => (progressMap[job.name] = { job, step: 0 }));
        } else if (m.type === 'testStart') {
            progressMap[m.value.name].started = true;
        } else if (m.type === 'stepSuccess') {
            progressMap[m.value.name].step += 1;
        } else if (m.type === 'stepFailure') {
            progressMap[m.value.name].failed = true;
        } else if (m.type === 'testEnd') {
            progressMap[m.value.name].finished = true;
        }
    });

    return Object.values(progressMap);
};

module.exports = { progressSelector };
