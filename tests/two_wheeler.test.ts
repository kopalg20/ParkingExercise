import { TWO_WHEELER } from "../Vehicles/two_wheeler";
import { SpotManager } from "../spot_manager";

describe("TWO_WHEELER", () => {
    beforeEach(() => {
        TWO_WHEELER.manager = new SpotManager(100);
    });

    test("initializes with correct rate per hour", () => {
        const tw = new TWO_WHEELER();
        expect(tw.ratePerHour).toBe(10);
    });

    test("uses a shared static SpotManager", () => {
        const tw1 = new TWO_WHEELER();
        const tw2 = new TWO_WHEELER();

        expect(tw1.spotManager).toBe(tw2.spotManager);
        expect(tw1.spotManager).toBe(TWO_WHEELER.manager);

        const s1 = tw1.spotManager.getFreeSpot();
        expect(s1).toBe(1);

        const s2 = tw2.spotManager.getFreeSpot();
        expect(s2).toBe(2);
    });

    test("calculates cost correctly for exact hours", () => {
        const tw = new TWO_WHEELER();

        const entry = new Date("2025-01-01T10:00:00");
        const exit = new Date("2025-01-01T12:00:00");

        expect(tw.calculateCost(entry, exit)).toBe(20);
    });
});
