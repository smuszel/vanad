const app = require('express')();
const kill = require('kill-port');
const port = 5505;

app.get('/', function (req, res) {
    res.setHeader('content-type', 'text/html');
    res.sendFile(__dirname + '/index.html');
});

app.get('/hw', function (req, res) {
    setTimeout(() => {
        res.json({ data: 'hello world' });
    }, 1000);
});

kill(port).then(() => app.listen(port));