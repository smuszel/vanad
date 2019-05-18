const app = require('express')();

app.get('/', function (req, res) {
    res.setHeader('content-type', 'text/html');
    res.sendFile(__dirname + '/index.html');
});
app.listen(5500);
process.on('uncaughtException', () => process.exit())