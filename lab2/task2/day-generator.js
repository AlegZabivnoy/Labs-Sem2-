const { dayGenerator, consumeWithTimeout } = require("labs-sem2");

const myIterator = dayGenerator();
consumeWithTimeout(myIterator, 2);