function consumeWithTimeout(iterator, seconds, onValue = (value) => console.log(`Day: ${value}`)) {
    const startTime = Date.now();
    const limitMs = seconds * 1000;

    console.log(`Starting for ${seconds}s...\n`);

    for (const value of iterator) {
        if (Date.now() - startTime >= limitMs) {
            break;
        }

        onValue(value);
    }

    console.log("\n[Done] Timeout reached.");
}

module.exports = {
    consumeWithTimeout
};
