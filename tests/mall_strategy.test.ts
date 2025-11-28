import { MallStrategy } from "../strategies/mall_strategy";

describe("MallStrategy", () => {
  let strategy: MallStrategy;

  beforeEach(() => {
    strategy = new MallStrategy();
  });

  test("should allocate motorcycle spot", () => {
    const spot = strategy.getFreeSpot("motorcycle");
    expect(spot).toBe(1);
  });

  test("should allocate car spot", () => {
    const spot = strategy.getFreeSpot("car");
    expect(spot).toBe(1);
  });

  test("should allocate truck spot", () => {
    const spot = strategy.getFreeSpot("truck");
    expect(spot).toBe(1);
  });

  test("should return null for unknown vehicle type", () => {
    expect(strategy.getFreeSpot("spaceship")).toBeNull();
  });

  test("should release a spot correctly", () => {
    const spot = strategy.getFreeSpot("car");
    strategy.releaseSpot("car", spot!);
    expect(strategy.carSpots.getFreeSpot()).toBe(spot);
  });

  test("should throw error if exit time < entry time", () => {
    const entry = new Date("2025-01-01T10:00:00");
    const exit = new Date("2025-01-01T09:00:00");

    expect(() => strategy.calculateFee("car", entry, exit)).toThrow(
      "Exit time cannot be before entry time"
    );
  });

  test("motorcycle: should charge minimum 1 hour", () => {
    const entry = new Date("2025-01-01T10:00:00");
    const exit = new Date("2025-01-01T10:10:00");

    const fee = strategy.calculateFee("motorcycle", entry, exit);
    expect(fee).toBe(10);
  });

  test("motorcycle: correct fee for multiple hours", () => {
    const entry = new Date("2025-01-01T10:00:00");
    const exit = new Date("2025-01-01T13:00:00");

    const fee = strategy.calculateFee("motorcycle", entry, exit);
    expect(fee).toBe(30);
  });

  test("car: correct fee for hours", () => {
    const entry = new Date("2025-01-01T10:00:00");
    const exit = new Date("2025-01-01T15:00:00");

    const fee = strategy.calculateFee("car", entry, exit);
    expect(fee).toBe(5 * 20);
  });

  test("truck: correct fee", () => {
    const entry = new Date("2025-01-01T08:00:00");
    const exit = new Date("2025-01-01T11:00:00");

    const fee = strategy.calculateFee("truck", entry, exit);
    expect(fee).toBe(3 * 50);
  });

  test("should throw for unknown vehicle type", () => {
    const entry = new Date("2025-01-01T10:00:00");
    const exit = new Date("2025-01-01T12:00:00");

    expect(() => strategy.calculateFee("plane", entry, exit)).toThrow(
      "Unknown vehicle type for Mall: plane"
    );
  });
});
