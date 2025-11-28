import { AirportStrategy } from "../strategies/airport_strategy";

describe("AirportStrategy", () => {
  let strategy: AirportStrategy;

  beforeEach(() => {
    strategy = new AirportStrategy();
  });

  test("allocates motorcycle spot correctly", () => {
    const spot = strategy.getFreeSpot("motorcycle");
    expect(spot).toBe(1);
  });

  test("allocates car spot correctly", () => {
    const spot = strategy.getFreeSpot("car");
    expect(spot).toBe(1);
  });

  test("returns null for truck (not allowed)", () => {
    expect(strategy.getFreeSpot("truck")).toBeNull();
  });

  test("releases a car spot back to availability", () => {
    const spot = strategy.getFreeSpot("car");
    strategy.releaseSpot("car", spot!);
    expect(strategy.getFreeSpot("car")).toBe(spot);
  });

  test("throws when exit < entry", () => {
    const entry = new Date("2025-01-01T10:00:00");
    const exit = new Date("2025-01-01T09:00:00");

    expect(() => strategy.calculateFee("car", entry, exit)).toThrow(
      "Exit time cannot be before entry time"
    );
  });

  test("throws for unknown vehicle type", () => {
    const entry = new Date("2025-01-01T10:00:00");
    const exit = new Date("2025-01-01T11:00:00");

    expect(() => strategy.calculateFee("bicycle", entry, exit)).toThrow(
      "Unknown vehicle type for Airport: bicycle"
    );
  });

  // MOTORCYCLE FEES
  test("motorcycle: <1 hour => fee = 0", () => {
    const entry = new Date("2025-01-01T10:00:00");
    const exit = new Date("2025-01-01T10:30:00");

    expect(strategy.calculateFee("motorcycle", entry, exit)).toBe(0);
  });

  test("motorcycle: 1–7 hours => fee = 40", () => {
    const entry = new Date("2025-01-01T10:00:00");
    const exit = new Date("2025-01-01T16:00:00");

    expect(strategy.calculateFee("motorcycle", entry, exit)).toBe(40);
  });

  test("motorcycle: 8–23 hours => fee = 60", () => {
    const entry = new Date("2025-01-01T00:00:00");
    const exit = new Date("2025-01-01T20:00:00");

    expect(strategy.calculateFee("motorcycle", entry, exit)).toBe(60);
  });

  test("motorcycle: ≥24 hours => per-day * days", () => {
    const entry = new Date("2025-01-01T00:00:00");
    const exit = new Date("2025-01-03T00:00:00");

    expect(strategy.calculateFee("motorcycle", entry, exit)).toBe(160);
  });

  test("motorcycle: 26 hours = 2 days fee", () => {
    const entry = new Date("2025-01-01T00:00:00");
    const exit = new Date("2025-01-02T02:00:00");

    expect(strategy.calculateFee("motorcycle", entry, exit)).toBe(160);
  });

  // CAR FEES
  test("car: <12 hours => short fee = 60", () => {
    const entry = new Date("2025-01-01T08:00:00");
    const exit = new Date("2025-01-01T18:00:00"); 

    expect(strategy.calculateFee("car", entry, exit)).toBe(60);
  });

  test("car: 12–23 hours => medium fee = 80", () => {
    const entry = new Date("2025-01-01T06:00:00");
    const exit = new Date("2025-01-01T20:00:00");

    expect(strategy.calculateFee("car", entry, exit)).toBe(80);
  });

  test("car: ≥24 hours => per-day * days", () => {
    const entry = new Date("2025-01-01T00:00:00");
    const exit = new Date("2025-01-02T00:00:00");

    expect(strategy.calculateFee("car", entry, exit)).toBe(100);
  });

  test("car: 30 hours => 2 days fee", () => {
    const entry = new Date("2025-01-01T00:00:00");
    const exit = new Date("2025-01-02T06:00:00");

    expect(strategy.calculateFee("car", entry, exit)).toBe(200);
  });
});
