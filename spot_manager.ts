import { MinPriorityQueue } from '@datastructures-js/priority-queue';

export class SpotManager {
    private freeSpots: MinPriorityQueue<{ priority: number }>;

    constructor(totalSpots: number) {
        this.freeSpots = new MinPriorityQueue((item) => item.priority);

        for (let i = 1; i <= totalSpots; i++) {
            this.freeSpots.enqueue({ priority: i });
        }
    }

    getFreeSpot(): number | null {
        if (this.freeSpots.isEmpty()) return null;
        const node = this.freeSpots.dequeue();
        return node ? node.priority : null;
    }

    releaseSpot(spot: number) {
        this.freeSpots.enqueue({ priority: spot });
    }
}
