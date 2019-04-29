module.exports = {
    see: sel => [page => page.$(sel), `I can see ${sel}`],
};