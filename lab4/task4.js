class BiPriorityQueue {
    constructor() {
        this.items = []
    }
    enqueue({value, priority}) {
        this.items.push({value, priority})
        console.log(`Added ${value} With priority ${priority}`)
    }
    _getIndex(type) {
        if(this.items.length === 0) return -1;
        if(type === 'oldest') return 0;
        if(type === 'newest') return this.items.length - 1;

        let targetIdx = 0;

        for(let i = 1; i < this.items.length; i++) {
            if (type === 'highest' && this.items[i].priority  > this.items[targetIdx].priority) {
                targetIdx = i;
            } else if (type === 'lowest' && this.items[i].priority < this.items[targetIdx].priority) {
                targetIdx = i;
            }
        }
        return targetIdx;
    }

    dequeue(type) {
        const idx = this._getIndex(type);
        if(idx === -1) return null;

        const removed = this.items.splice(idx, 1);
        return removed[0].value;
    }

    peek(type) {
        const idx = this._getIndex(type);
        if(idx === -1) return null;
        return this.items[idx].value;
    }
}

const test = new BiPriorityQueue();
test.enqueue({value: 'A', priority: 1});
test.enqueue({value: 'B', priority: 2});
test.enqueue({value: 'C', priority: 3});

console.log(test.peek('highest'));
console.log(test.peek('lowest'));
console.log(test.peek('newest'));
console.log(test.peek('oldest'));