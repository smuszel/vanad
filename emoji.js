const em = require('node-emoji');
const db = require('./emojidb');
db.heavy_check_mark;
const f = function*() {
    yield em.get('heavy_check_mark');
};

Array.from(f()).forEach(x => console.log(x));
