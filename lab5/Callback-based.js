function mapCallback(array,iteratee,finalCallback) {
    let results = [];
    let completed = 0;

    if(array.length ===0) {
        return finalCallback(results);
    }

    array.forEach((item,index) => {
        iteratee(item, (result) => {
            results[index] = result;
            completed++;

            if(completed === array.length) {
                finalCallback(results);
            }
        });
    });
}