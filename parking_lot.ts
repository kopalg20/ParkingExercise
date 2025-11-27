import { Ticket } from "./ticket";
import { LotType, getStrategy } from "./startegy_factory";

export class ParkingLot {
    private lotType: LotType;
    private activeTickets: Map<string, Ticket> = new Map();
    private strategy: any;

    constructor(lotType: string) {
        this.lotType = lotType as LotType;
        this.strategy = getStrategy(this.lotType);
    }

    park(type: string): string {
        const lot = this.strategy;
        const spot = lot.getFreeSpot(type);
        if (spot === null) {
            return `No free ${type} parking spots available`;
        }

        const ticketId = "T" + Date.now();
        const ticket = new Ticket(ticketId, spot, new Date(), type);

        this.activeTickets.set(ticketId, ticket);

        return lot.generateTicket(ticket);
    }

    unpark(ticketId: string): string {
        const ticket = this.activeTickets.get(ticketId);
        if (!ticket) return "Invalid Ticket ID";

        const lot = this.strategy;

        const exitTime = new Date();
        const amount = lot.calculateFee(ticket.type,ticket.entryTime, exitTime);

        lot.releaseSpot(ticket.type,ticket.spotNumber);

        this.activeTickets.delete(ticketId);

        return lot.generateReceipt(ticket, exitTime, amount);
    }
}

// Test run
const lot = new ParkingLot("airport");

const ticket1 = lot.park("motorcycle");
console.log(ticket1);

const ticketIdMatch = ticket1.match(/Ticket ID:\s*(T\d+)/);
const ticketId = ticketIdMatch ? ticketIdMatch[1] : "";

setTimeout(() => {
    const receipt = lot.unpark(ticketId);
    console.log(receipt);
}, 3000);
