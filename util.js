module.exports.selectorsPresence = (page, sel) => async () => {
    const handles = await Promise.all(sel.map(s => page.$(s)));
    const failedIx = handles.findIndex(x => !x);
    const failedSelector = failedIx > -1 ? step.selectors[failedIx] : null;

    return failedSelector && `Query for ${failedSelector} returns empty handle`;
}

module.exports.xhrStart = page => new Promise(rez => {
    page.on('request', req => {
        req.resourceType() === 'xhr' && rez();
    });
});

module.exports.xhrEnd = page => new Promise(rez => {
    page.on('requestfinished', req => {
        req.resourceType() === 'xhr' && rez();
    });
});