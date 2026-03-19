function memoize(fn, options = {}) {
    const {
        limit = Infinity,
        strategy = 'LRU',
        ttl = null,
        customPolicy = null
    } = options;

    const cache = new Map();

    return function (...args) {
        const key = JSON.stringify(args);
        const now = Date.now();

        if (cache.has(key)) {
            const entry = cache.get(key);
            if (ttl && (now - entry.timestamp > ttl)) {
                cache.delete(key);
            } else {
                entry.lastUsed = now;
                entry.count++;
                return entry.value;
            }
        }

        const value = fn(...args);
        if (cache.size >= limit && !cache.has(key)) {
            evict(cache, strategy, customPolicy)
        }

        cache.set(key, {
            value: value,
            timestamp: now,
            lastUsed: now,
            count: 1
        });

        return value;
    }
}

function evict(cache, strategy, customPolicy) {
    if (customPolicy && typeof customPolicy === 'function') {
        customPolicy(cache);
        return;
    }

    let keyToDelete = null;

    if (strategy === 'LRU') {
        let oldest = Infinity;
        for (let [key, entry] of cache) {
            if (entry.lastUsed < oldest) {
                oldest = entry.lastUsed;
                keyToDelete = key;
            }
        }
    } else if (strategy === 'LFU') {
        let leastFrequent = Infinity;
        for (let [key, entry] of cache) {
            if (entry.count < leastFrequent) {
                leastFrequent = entry.count;
                keyToDelete = key;
            }
        }
    }

    if (keyToDelete) {
        cache.delete(keyToDelete);
    }
}

const slowAdd = (a, b) => {
    return a + b;
};

const fastAdd = memoize(slowAdd, { limit: 2, strategy: 'LRU' });

console.log(fastAdd(1, 1));
console.log(fastAdd(2, 2));
console.log(fastAdd(1, 1));
console.log(fastAdd(3, 3));


