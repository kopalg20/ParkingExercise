import { VehicleFactory } from "./vehicle_factory";
import { Ticket } from "./ticket";
export class ParkingLot {
    private activeTickets: Map<string, Ticket> = new Map();

    park(type: string): string {
        const vehicle = VehicleFactory.create(type);

        const spot = vehicle.spotManager.getFreeSpot();
        if (spot === null) {
            return `No free ${type} parking spots available`;
        }

        const ticketId = "T" + Date.now();
        const ticket = new Ticket(ticketId, spot, new Date(), type);

        this.activeTickets.set(ticketId, ticket);

        return vehicle.generateTicket(ticket);
    }

    unpark(ticketId: string): string {
        const ticket = this.activeTickets.get(ticketId);
        if (!ticket) return "Invalid Ticket ID";

        const vehicle = VehicleFactory.create(ticket.type);

        const exitTime = new Date();
        const amount = vehicle.calculateCost(ticket.entryTime, exitTime);

        vehicle.spotManager.releaseSpot(ticket.spotNumber);

        this.activeTickets.delete(ticketId);

        return vehicle.generateReceipt(ticket, exitTime, amount);
    }
}

const lot = new ParkingLot();

const ticket1 = lot.park("car");
console.log(ticket1);

setTimeout(() => {
    const receipt = lot.unpark("T" + ticket1.match(/\d+/)?.[0]);
    console.log(receipt);
}, 5000);
