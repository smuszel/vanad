module.exports = {
    suiteStart: (name) => console.log('start', name),
    stepResolved: (name, label, err) => {
        console.log(name + ' > ' + label, err || '');
    },
    suiteEnd: (name) => console.log('end', name)
}