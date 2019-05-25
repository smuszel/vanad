module.exports = async function*({ context }) {
    const page = await context.newPage();
    await page.goto('http://localhost:5505/hello');

    const title = await page.title();
    yield title === 'Hello World';
};
