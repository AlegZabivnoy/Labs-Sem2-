class BiPriorityQueue {
    constructor(items) {
        this.items = []
    }
    enqueue({value, priority}) {
        this.items.push(value, priority)
        console.log(`Added ${value} With priority ${priority}`)
    }
    _getInddex(type) {
        if(this.items.length === 0) retrun -1;
        let targetIdx = 0;
        for(let i = 1; i < this.items.length; i++) {
            if (type === 'highest' && this.items[i].priority  > this.items[targetIdx].priority {
                targetIdx = i;
            } else if (type === 'lowest' && this.items[i].priority < this.items[targetIdx].priority) {
                targetIdx = i;
            }
        }
        if(type === 'oldest') targetIdx = 0;
        if(type === 'newest') targetIdx = this.items.length - 1;
        return targetIdx;
    }
}