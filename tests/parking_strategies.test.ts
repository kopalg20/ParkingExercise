import { ParkingStrategy } from "../parking_strategies";
import { SpotManager } from "../spot_manager";
import { Ticket } from "../ticket";

class MockStrategy extends ParkingStrategy {
    constructor() {
        super(2, 2, 2);
    }
    calculateFee(): number {
        return 50;
    }
}

describe("ParkingStrategy Base Class Tests", () => {

    let strategy: ParkingStrategy;

    beforeEach(() => {
        strategy = new MockStrategy();
    });

    test("Should allocate motorcycle spot", () => {
        const spot = strategy.getFreeSpot("motorcycle");
        expect(spot).toBe(1);
    });

    test("Should allocate car spot", () => {
        const spot = strategy.getFreeSpot("car");
        expect(spot).toBe(1);
    });

    test("Should allocate truck spot", () => {
        const spot = strategy.getFreeSpot("truck");
        expect(spot).toBe(1);
    });

    test("Should return null when no spots available", () => {
        strategy.getFreeSpot("car");
        strategy.getFreeSpot("car");
        const spot3 = strategy.getFreeSpot("car");
        expect(spot3).toBeNull();
    });

    test("Should release booked spot successfully", () => {
        const spot = strategy.getFreeSpot("suv"); 
        expect(() => strategy.releaseSpot("suv", spot!)).not.toThrow();
    });

    test("Should throw error when trying to release unassigned spot", () => {
        expect(() => strategy.releaseSpot("car", 2)).toThrow();
    });

    test("Should return null for unknown vehicle type", () => {
        expect(strategy.getFreeSpot("spaceship")).toBeNull();
    });

    test("Should generate correct ticket", () => {
        const ticket = new Ticket("T123", 5, new Date("2025-01-01"), "car");
        const output = strategy.generateTicket(ticket);

        expect(output).toContain("T123");
        expect(output).toContain("car");
        expect(output).toContain("5");
       expect(output).toContain("2025");
    });

    test("Should generate correct receipt", () => {
        const ticket = new Ticket("T999", 3, new Date("2025-01-01"), "motorcycle");
        const exit = new Date("2025-01-02");

        const receipt = strategy.generateReceipt(ticket, exit, 120);

        expect(receipt).toContain("T999");
        expect(receipt).toContain("120");
        expect(receipt).toContain("Exit Time");
        expect(receipt).toContain("Total Amount");
    });

    test("Should throw error for negative amount", () => {
        const ticket = new Ticket("T100", 1, new Date(), "car");
        expect(() =>
            strategy.generateReceipt(ticket, new Date(), -10)
        ).toThrow("Amount cannot be negative");
    });
});
