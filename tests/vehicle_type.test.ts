import { VehicleType } from "../vehicle_type";
import { Ticket } from "../ticket";
import { SpotManager } from "../spot_manager";

class MockSpotManager extends SpotManager {
    constructor() { super(10); }
}

class TestVehicleType extends VehicleType {
    spotManager = new MockSpotManager();
}

describe("VehicleType", () => {

    let vehicleType: VehicleType;

    beforeEach(() => {
        vehicleType = new TestVehicleType(10); // ₹10 per hour for testing
    });

    test("should calculate cost correctly (rounding hours up)", () => {
        const entry = new Date("2025-01-01T10:00:00");
        const exit = new Date("2025-01-01T12:30:00"); // 2.5 hours → 3 hours

        const amount = vehicleType.calculateCost(entry, exit);

        expect(amount).toBe(30); // 3 hours × ₹10
    });

    test("should generate ticket string correctly", () => {
        const ticket = new Ticket("T1", 5, new Date("2025-01-01T10:00:00"),"TestType");

        const output = vehicleType.generateTicket(ticket);

        expect(output).toContain("PARKING TICKET");
        expect(output).toContain("T1");
        expect(output).toContain("TestType");
        expect(output).toContain("5");
    });

    test("should generate receipt string correctly", () => {
        const entry = new Date("2025-01-01T10:00:00");
        const exit = new Date("2025-01-01T13:00:00");

        const ticket = new Ticket("T2", 7, entry,"TestType");
        const amount = vehicleType.calculateCost(entry, exit);

        const output = vehicleType.generateReceipt(ticket, exit, amount);

        expect(output).toContain("PARKING RECEIPT");
        expect(output).toContain("T2");
        expect(output).toContain("TestType");
        expect(output).toContain("7");
        expect(output).toContain("₹30"); // 3 hours × ₹10
    });

    test("should charge minimum 1 hour even if exit == entry", () => {
        const entry = new Date("2025-01-01T10:00:00");
        const exit = new Date("2025-01-01T10:00:00");

        const amount = vehicleType.calculateCost(entry, exit);
        expect(amount).toBe(10); // 1 hour minimum
    });

    test("should throw error if exit time is before entry time", () => {
        const entry = new Date("2025-01-01T12:00:00");
        const exit = new Date("2025-01-01T10:00:00");

        expect(() => vehicleType.calculateCost(entry, exit)).toThrow();
    });

    test("should correctly calculate long duration cost (24+ hours)", () => {
        const entry = new Date("2025-01-01T00:00:00");
        const exit = new Date("2025-01-02T05:00:00"); // 29 hours

        const amount = vehicleType.calculateCost(entry, exit);

        expect(amount).toBe(290); // 29 * 10
    });

    test("should reject invalid ratePerHour", () => {
        expect(() => new TestVehicleType(-5)).toThrow();
    });
    test("should reject negative amount in receipt generation", () => {
        const ticket = new Ticket("T3", 8, new Date("2025-01-01T10:00:00"),"TestType");
        const exit = new Date("2025-01-01T12:00:00");
        expect(() => vehicleType.generateReceipt(ticket, exit, -50)).toThrow();
    })
});
