import { FOUR_WHEELER_HEAVY } from "../Vehicles/four_wheeler_heavy";
import { SpotManager } from "../spot_manager";

describe("FOUR_WHEELER_HEAVY", () => {
    beforeEach(() => {
        FOUR_WHEELER_HEAVY.manager = new SpotManager(100);
    });

    test("initializes with correct rate per hour", () => {
        const fw = new FOUR_WHEELER_HEAVY();
        expect(fw.ratePerHour).toBe(20);
    });

    test("uses a shared static SpotManager", () => {
        const fw1 = new FOUR_WHEELER_HEAVY();
        const fw2 = new FOUR_WHEELER_HEAVY();

        expect(fw1.spotManager).toBe(fw2.spotManager);
        expect(fw1.spotManager).toBe(FOUR_WHEELER_HEAVY.manager);

        const s1 = fw1.spotManager.getFreeSpot();
        expect(s1).toBe(1);

        const s2 = fw2.spotManager.getFreeSpot();
        expect(s2).toBe(2);
    });

    test("calculates cost correctly for exact hours", () => {
        const fw = new FOUR_WHEELER_HEAVY();

        const entry = new Date("2025-01-01T10:00:00");
        const exit = new Date("2025-01-01T12:00:00");

        expect(fw.calculateCost(entry, exit)).toBe(40);
    });
});
