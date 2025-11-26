import { Ticket } from "../ticket";

describe("Ticket Class Tests", () => {

    const sampleDate = new Date("2024-01-01T10:00:00");


    test("should create a Ticket instance with correct values", () => {
        const ticket = new Ticket("T123", 5, sampleDate, "car");

        expect(ticket.id).toBe("T123");
        expect(ticket.spotNumber).toBe(5);
        expect(ticket.entryTime).toBe(sampleDate);
        expect(ticket.type).toBe("car");
    });

    test("should allow any valid date object", () => {
        const now = new Date();
        const ticket = new Ticket("T99", 1, now, "motorcycle");

        expect(ticket.entryTime).toBe(now);
    });


    test("should allow id as string but reject empty string", () => {
        expect(() => new Ticket("", 2, sampleDate, "car")).toThrow();
    });

    test("should reject null id", () => {
        expect(() => new Ticket(null as any, 3, sampleDate, "car")).toThrow();
    });

    test("should reject undefined id", () => {
        expect(() => new Ticket(undefined as any, 3, sampleDate, "car")).toThrow();
    });

    test("should reject non-string id values", () => {
        expect(() => new Ticket(123 as any, 3, sampleDate, "car")).toThrow();
        expect(() => new Ticket({} as any, 3, sampleDate, "car")).toThrow();
    });


    test("should reject negative spot number", () => {
        expect(() => new Ticket("T1", -1, sampleDate, "car")).toThrow();
    });

    test("should reject non-number spot number", () => {
        expect(() => new Ticket("T1", "A" as any, sampleDate, "car")).toThrow();
    });

    test("should reject floating point spot numbers", () => {
        expect(() => new Ticket("T1", 2.5 as any, sampleDate, "car")).toThrow();
    });


    test("should reject invalid date object", () => {
        expect(() => new Ticket("T1", 1, new Date("invalid"), "car")).toThrow();
    });

    test("should reject non-date entryTime values", () => {
        expect(() => new Ticket("T1", 1, "2024-01-01" as any, "car")).toThrow();
        expect(() => new Ticket("T1", 1, 12345 as any, "car")).toThrow();
    });

    test("should reject null or undefined entryTime", () => {
        expect(() => new Ticket("T1", 1, null as any, "car")).toThrow();
        expect(() => new Ticket("T1", 1, undefined as any, "car")).toThrow();
    });


    test("should reject empty type", () => {
        expect(() => new Ticket("T1", 1, sampleDate, "")).toThrow();
    });

    test("should reject non-string type values", () => {
        expect(() => new Ticket("T1", 1, sampleDate, false as any)).toThrow();
        expect(() => new Ticket("T1", 1, sampleDate, 123 as any)).toThrow();
        expect(() => new Ticket("T1", 1, sampleDate, {} as any)).toThrow();
    });


    test("should allow extremely long string IDs", () => {
        const longId = "T".repeat(500);
        const ticket = new Ticket(longId, 10, sampleDate, "car");
        expect(ticket.id).toBe(longId);
    });

    test("should allow very large spot numbers (if needed)", () => {
        const ticket = new Ticket("T1", 999999, sampleDate, "car");
        expect(ticket.spotNumber).toBe(999999);
    });

});
