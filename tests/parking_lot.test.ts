import { ParkingLot } from "../parking_lot";
import { ParkingStrategy } from "../parking_strategies";

class FakeStrategy extends ParkingStrategy {
    public fee = 50;
    constructor(moto: number, car: number, truck: number) {
        super(moto, car, truck);
    }
    calculateFee(): number {
        return this.fee;
    }
}

describe("ParkingLot", () => {

    test("park() returns no spot message when full", () => {
        const fake = new FakeStrategy(0, 1, 0);
        const lot = new ParkingLot("mall") as any;
        lot.strategy = fake;

        lot.park("car");

        const msg = lot.park("car");
        expect(msg).toBe("No free car parking spots available");
    });

    test("unpark() returns receipt for valid ticket", () => {
        const fake = new FakeStrategy(1, 1, 0);
        const lot = new ParkingLot("mall") as any;
        lot.strategy = fake;

        const ticketText = lot.park("motorcycle");
        const id = ticketText.match(/T\d+/)![0];

        const receipt = lot.unpark(id);

        expect(receipt).toContain("PARKING RECEIPT");
        expect(receipt).toContain(id);
    });

    test("unpark() releases the spot (behavior test, not internals)", () => {
        const fake = new FakeStrategy(0, 1, 0);
        const lot = new ParkingLot("mall") as any;
        lot.strategy = fake;

        const t1 = lot.park("car");
        const id = t1.match(/T\d+/)![0];

        lot.unpark(id);

        const t2 = lot.park("car");
        expect(t2).toContain("Spot Number: 1");
    });

    test("unpark() returns 'Invalid Ticket ID' for unknown ticket", () => {
        const lot = new ParkingLot("mall");
        const result = lot.unpark("INVALID123");
        expect(result).toBe("Invalid Ticket ID");
    });
});
