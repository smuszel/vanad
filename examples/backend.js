// @ts-ignore
const kill = require('kill-port');
const app = require('express')();
const port = 5505;
kill(port).then(() => app.listen(port));

const path = require('path');
const resolve = (...args) => path.resolve(__dirname, ...args);

app.get('/', (_, res) => {
    res.sendFile(resolve('index.html'));
});

app.get('/site', (_, res) => {
    res.sendFile(resolve('basic-site', 'index.html'));
});

app.get('/frontend.js', (_, res) => {
    res.sendFile(resolve('basic-site', 'frontend.js'));
});

app.get('/hello', (_, res) => {
    res.sendFile(resolve('hello-world', 'index.html'));
});

// app.get('/', (req, res) => {
//     res.setHeader('content-type', 'text/html');
//     res.sendFile(__dirname + '/index.html');
// });

// app.get('/hw', (req, res) => {
//     setTimeout(() => {
//         res.json({ data: 'hello world' });
//     }, 1000);
// });
