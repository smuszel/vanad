module.exports = async function*({ context }) {
    const page = await context.newPage();
    await page.goto('http://localhost:5505/hello');

    yield 'Example text that will show in log';
    await new Promise(rez => setTimeout(rez, 3000));
    const title = await page.title();

    yield title === 'Hello World';
};
