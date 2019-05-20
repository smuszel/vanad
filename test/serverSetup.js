const app = require('express')();
const kill = require('kill-port');
const port = 5505;

app.get('/', (req, res) => {
    res.setHeader('content-type', 'text/html');
    res.sendFile(__dirname + '/index.html');
});

app.get('/hw', (req, res) => {
    setTimeout(() => {
        res.json({ data: 'hello world' });
    }, 1000);
});

kill(port).then(() => app.listen(port));
