import { StadiumStrategy } from "../strategies/stadium_strategy";

describe("StadiumStrategy", () => {
  let strategy: StadiumStrategy;

  beforeEach(() => {
    strategy = new StadiumStrategy();
  });

  test("should allocate spot for motorcycle", () => {
    const spot = strategy.getFreeSpot("motorcycle");
    expect(spot).toBe(1);
  });

  test("should allocate spot for car", () => {
    const spot = strategy.getFreeSpot("car");
    expect(spot).toBe(1);
  });

  test("should return null for trucks (not allowed)", () => {
    expect(strategy.getFreeSpot("truck")).toBeNull();
  });

  test("should release spot correctly", () => {
    const spot = strategy.getFreeSpot("car");
    strategy.releaseSpot("car", spot!);
    expect(strategy.getFreeSpot("car")).toBe(spot);
  });

  test("should throw error when exit time < entry time", () => {
    const entry = new Date("2025-01-01T10:00:00");
    const exit = new Date("2025-01-01T09:00:00");

    expect(() => strategy.calculateFee("car", entry, exit)).toThrow(
      "Exit time cannot be before entry time"
    );
  });

  test("should throw for forbidden vehicle type", () => {
    const entry = new Date("2025-01-01T10:00:00");
    const exit = new Date("2025-01-01T12:00:00");

    expect(() => strategy.calculateFee("truck", entry, exit)).toThrow(
      "The truck vehicle type not allowed in Stadium"
    );
  });

  // MOTORCYCLE FEE TESTS
  test("motorcycle: <= 4 hours → ₹30", () => {
    const entry = new Date("2025-01-01T10:00:00");
    const exit = new Date("2025-01-01T14:00:00"); // 4 hr

    expect(strategy.calculateFee("motorcycle", entry, exit)).toBe(30);
  });

  test("motorcycle: 5–12 hours → ₹30 + ₹60 = ₹90", () => {
    const entry = new Date("2025-01-01T10:00:00");
    const exit = new Date("2025-01-01T18:00:00"); // 8 hr

    expect(strategy.calculateFee("motorcycle", entry, exit)).toBe(90);
  });

  test("motorcycle: > 12 hours → add ₹100 per extra hour", () => {
    const entry = new Date("2025-01-01T06:00:00");
    const exit = new Date("2025-01-01T22:00:00"); 

    expect(strategy.calculateFee("motorcycle", entry, exit)).toBe(490);
  });

  // CAR FEE TESTS
  test("car: <= 4 hours → ₹60", () => {
    const entry = new Date("2025-01-01T10:00:00");
    const exit = new Date("2025-01-01T14:00:00"); // 4 hr

    expect(strategy.calculateFee("car", entry, exit)).toBe(60);
  });

  test("car: >4 and <12 hours → ₹60 + ₹120 = ₹180", () => {
    const entry = new Date("2025-01-01T10:00:00");
    const exit = new Date("2025-01-01T18:00:00"); // 8 hr

    expect(strategy.calculateFee("car", entry, exit)).toBe(180);
  });

  test("car: >=12 hours → ₹60 + ₹120 + 200 * (extra hours + 1)", () => {
    const entry = new Date("2025-01-01T06:00:00");
    const exit = new Date("2025-01-01T22:00:00");

    expect(strategy.calculateFee("car", entry, exit)).toBe(1180);
  });

  test("car: exactly 12 hours → count as extra hour", () => {
    const entry = new Date("2025-01-01T06:00:00");
    const exit = new Date("2025-01-01T18:00:00"); // 12 hr

    expect(strategy.calculateFee("car", entry, exit)).toBe(380);
  });
});
