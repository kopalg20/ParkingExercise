import { MinPriorityQueue } from '@datastructures-js/priority-queue';

export class SpotManager {
    private freeSpots: MinPriorityQueue<{ priority: number }>;
    private totalSpots: number;
    private assignedSpots: Set<number>;

    constructor(totalSpots: number) {
        if (totalSpots < 0 || !Number.isInteger(totalSpots)) {
            throw new Error("totalSpots must be a non-negative integer");
        }

        this.totalSpots = totalSpots;
        this.assignedSpots = new Set();

        this.freeSpots = new MinPriorityQueue((item) => item.priority);

        for (let i = 1; i <= totalSpots; i++) {
            this.freeSpots.enqueue({ priority: i });
        }
    }

    getFreeSpot(): number | null {
        if (this.freeSpots.isEmpty()) return null;

        const node = this.freeSpots.dequeue();
        const spot = node.priority;
        this.assignedSpots.add(spot);

        return spot;
    }

    releaseSpot(spot: number): void {
        if (typeof spot !== "number" || !Number.isInteger(spot)) {
            throw new Error("Spot number must be an integer");
        }

        if (spot < 1 || spot > this.totalSpots) {
            throw new Error("Spot number is out of valid range");
        }

        if (!this.assignedSpots.has(spot)) {
            throw new Error("Cannot release a spot that is not assigned");
        }

        this.assignedSpots.delete(spot);
        this.freeSpots.enqueue({ priority: spot });
    }
}
