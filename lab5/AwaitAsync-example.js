const mapCallback = require("./Callback-based");
const mapPromise = require("./Promise-based");
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function runExample() {
    const data = [1, 2, 3, 4, 5];

    console.log("Example 1 (callback)");
    mapCallback(data, (num, done) => {
        setTimeout(() => done(num * 10), 200);
    }, (results) => {
        console.log(results);
    });

    await delay(1000);
    console.log("Example 2 (promise+async/await)");

    try {
        const promiseResult = await mapPromise(data, async (num) => {
            await delay(200);
            return num * 10;
        });

        console.log(promiseResult);
    } catch (error) {
        console.error(error);
    }

    console.log("Example 3 (Abortable/Cancellable)");

    const controller = new AbortController();

    setTimeout(() => controller.abort(), 500);

    try {
        await mapPromise(data, async (num) => {
            await delay(1000);
            return num * 10;
        }, {signal: controller.signal});
    } catch (error) {
        console.error(error);
    }
}

runExample();