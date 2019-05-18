/** @type {QueryFactory<Page, any[]>} */
module.exports.selectorsPresence = (page, selectors) => async () => {
    const handles = await Promise.all(selectors.map(s => page.$(s)));
    const failedIx = handles.findIndex(x => !x);
    const failedSelector = failedIx > -1 ? selectors[failedIx] : null;

    return failedSelector ? { type: 'selectorPresence', value: failedSelector } : null;
}