const { dayGenerator, consumeWithTimeout } = require("../src");

const myIterator = dayGenerator();
consumeWithTimeout(myIterator, 2);