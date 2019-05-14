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