function mapPromise(array, iteratee, {signal} = {}) {
    return new Promise((resolve, reject) => {

        if (signal?.aborted) {
            return reject (new Error("Aborted"))
        }

        const promises = array.map(async (item) => {
            if (signal?.aborted) throw new Error("Aborted");
            return await iteratee(item);
        });

        signal?.addEventListener("abort", () => {
            reject(new Error("Aborted"));
        })

        Promise.all(promises).then(resolve).catch(reject);
    })
}

module.exports = mapPromise;