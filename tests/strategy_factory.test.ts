import { getStrategy, LotType } from "../startegy_factory";
import { MallStrategy } from "../strategies/mall_strategy";
import { StadiumStrategy } from "../strategies/stadium_strategy";
import { AirportStrategy } from "../strategies/airport_strategy";
import { ParkingStrategy } from "../parking_strategies";

describe("getStrategy() Factory Tests", () => {

    test("Should return MallStrategy when lot type is mall", () => {
        const strategy = getStrategy(LotType.MALL);
        expect(strategy).toBeInstanceOf(MallStrategy);
    });

    test("Should return StadiumStrategy when lot type is stadium", () => {
        const strategy = getStrategy(LotType.STADIUM);
        expect(strategy).toBeInstanceOf(StadiumStrategy);
    });

    test("Should return AirportStrategy when lot type is airport", () => {
        const strategy = getStrategy(LotType.AIRPORT);
        expect(strategy).toBeInstanceOf(AirportStrategy);
    });

    test("Returned strategy instances should extend ParkingStrategy", () => {
        const mall = getStrategy(LotType.MALL);
        const stadium = getStrategy(LotType.STADIUM);
        const airport = getStrategy(LotType.AIRPORT);

        expect(mall instanceof ParkingStrategy).toBe(true);
        expect(stadium instanceof ParkingStrategy).toBe(true);
        expect(airport instanceof ParkingStrategy).toBe(true);
    });

    test("Should throw error for unknown lot type", () => {
        expect(() => getStrategy("invalid-lot" as LotType))
            .toThrow("Unknown lot type: invalid-lot");
    });

    test("Should throw error for empty string", () => {
        expect(() => getStrategy("" as LotType))
            .toThrow("Unknown lot type: ");
    });

    test("Should throw error for null input", () => {
        expect(() => getStrategy(null as any))
            .toThrow("Unknown lot type: null");
    });

    test("Should throw error for undefined input", () => {
        expect(() => getStrategy(undefined as any))
            .toThrow("Unknown lot type: undefined");
    });

    test("Should create a new instance every time, not a cached one", () => {
        const strat1 = getStrategy(LotType.MALL);
        const strat2 = getStrategy(LotType.MALL);

        expect(strat1).not.toBe(strat2);
    });

});
