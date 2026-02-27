function* dayGenerator() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let i = 0;

    while (true) {
        yield days[i % 7];
        i++;
    }
}

module.exports = {
    dayGenerator
};
