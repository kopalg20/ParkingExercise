import { ParkingLot } from "../parking_lot";
import { VehicleFactory } from "../vehicle_factory";
import { Ticket } from "../ticket";

describe("ParkingLot", () => {
    let lot: ParkingLot;
    let mockVehicle: any;

    beforeEach(() => {
        lot = new ParkingLot();
        mockVehicle = {
            spotManager: {
                getFreeSpot: jest.fn(),
                releaseSpot: jest.fn(),
            },
            calculateCost: jest.fn(() => 100),
            generateTicket: jest.fn((ticket: Ticket) => `Ticket-${ticket.spotNumber}`),
            generateReceipt: jest.fn((ticket: Ticket, exitTime: Date, amount: number) => `Receipt-${amount}`),
            type: "car",
        };

        jest.spyOn(VehicleFactory, "create").mockReturnValue(mockVehicle);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("parks a vehicle successfully", () => {
        mockVehicle.spotManager.getFreeSpot.mockReturnValue(1);

        const ticket = lot.park("car");

        expect(mockVehicle.spotManager.getFreeSpot).toHaveBeenCalled();
        expect(mockVehicle.generateTicket).toHaveBeenCalled();
        expect(ticket).toBe("Ticket-1");
    });

    test("returns no spot message when parking full", () => {
        mockVehicle.spotManager.getFreeSpot.mockReturnValue(null);

        const result = lot.park("car");

        expect(result).toBe("No free car parking spots available");
        expect(mockVehicle.generateTicket).not.toHaveBeenCalled();
    });

    test("unparks a vehicle successfully", () => {
    mockVehicle.spotManager.getFreeSpot.mockReturnValue(2);
    const ticketStr = lot.park("car"); 
    const ticketId = Array.from((lot as any).activeTickets.keys())[0] as string;
    const receipt = lot.unpark(ticketId);
    expect(mockVehicle.calculateCost).toHaveBeenCalled();
    expect(mockVehicle.spotManager.releaseSpot).toHaveBeenCalledWith(2);
    expect(mockVehicle.generateReceipt).toHaveBeenCalled();
    expect(receipt).toBe("Receipt-100");
});


    test("returns error for invalid ticket ID", () => {
        const receipt = lot.unpark("INVALID");

        expect(receipt).toBe("Invalid Ticket ID");
    });
});
