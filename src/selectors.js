/** @type {Selector<Progress[]>} */
const progressSelector = (done, diff) => {
    /** @type {Map<string, Progress>} */
    const progressMap = new Map();
    [...done, ...diff].forEach(m => {
        if (m.type === 'jobScheduled') {
            m.value.forEach(job => (progressMap[job.name] = { job, step: [] }));
        } else if (m.type === 'testStart') {
            progressMap[m.value.job.name].started = true;
        } else if (m.type === 'stepSuccess') {
            progressMap[m.value.job.name].step.push(m.value.text);
        } else if (m.type === 'stepFailure') {
            progressMap[m.value.job.name].failed = true;
            progressMap[m.value.job.name].reason = m.value.text;
        } else if (m.type === 'testEnd') {
            progressMap[m.value.job.name].finished = true;
        }
    });

    return Object.values(progressMap);
};

module.exports = { progressSelector };
