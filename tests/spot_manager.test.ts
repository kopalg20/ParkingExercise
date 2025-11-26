import { SpotManager } from "../spot_manager";

describe("SpotManager", () => {
    test("initializes with correct number of free spots", () => {
        const sm = new SpotManager(5);

        expect(sm.getFreeSpot()).toBe(1);
        expect(sm.getFreeSpot()).toBe(2);
        expect(sm.getFreeSpot()).toBe(3);
        expect(sm.getFreeSpot()).toBe(4);
        expect(sm.getFreeSpot()).toBe(5);

        expect(sm.getFreeSpot()).toBeNull();
    });

    test("throws error if totalSpots is negative", () => {
        expect(() => new SpotManager(-5)).toThrow("totalSpots must be a non-negative integer");
    });

    test("throws error if totalSpots is not an integer", () => {
        expect(() => new SpotManager(2.7)).toThrow("totalSpots must be a non-negative integer");
    });

    test("throws error on releasing a non-assigned spot", () => {
        const sm = new SpotManager(3);

        expect(() => sm.releaseSpot(1)).toThrow("Cannot release a spot that is not assigned");

        const s = sm.getFreeSpot();
        expect(s).toBe(1);

        sm.releaseSpot(1);

        expect(() => sm.releaseSpot(1)).toThrow("Cannot release a spot that is not assigned");
    });

    test("throws error when releasing out-of-range spot", () => {
        const sm = new SpotManager(5);

        expect(() => sm.releaseSpot(0)).toThrow("Spot number is out of valid range");
        expect(() => sm.releaseSpot(6)).toThrow("Spot number is out of valid range");
        expect(() => sm.releaseSpot(99)).toThrow("Spot number is out of valid range");
    });

    test("throws error when releasing a non-integer spot", () => {
        const sm = new SpotManager(5);

        expect(() => sm.releaseSpot(2.5)).toThrow("Spot number must be an integer");
    });

    test("properly manages assigned and free spots", () => {
        const sm = new SpotManager(3);

        const s1 = sm.getFreeSpot(); 
        const s2 = sm.getFreeSpot(); 

        expect(s1).toBe(1);
        expect(s2).toBe(2);

        sm.releaseSpot(2);

        expect(sm.getFreeSpot()).toBe(2);

        expect(sm.getFreeSpot()).toBe(3);
    });
});
