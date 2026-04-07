class BiPriorityQueue {
    constructor(items) {
        this.items = []
    }
    enqueue({value, priority}) {
        this.items.push(value, priority)
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
}