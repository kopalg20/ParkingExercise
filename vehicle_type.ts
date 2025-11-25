import { Ticket } from "./ticket";
import { SpotManager } from "./spot_manager";
export abstract class VehicleType {
    constructor(
        public ratePerHour: number
    ) {}

    calculateCost(entry: Date, exit: Date): number {
        const durationMs = exit.getTime() - entry.getTime();
        const hours = Math.ceil(durationMs / (1000 * 60 * 60));
        return hours * this.ratePerHour;
    }

    generateTicket(ticket: Ticket): string {
        return `
        ------ PARKING TICKET ------
        Ticket ID: ${ticket.id}
        Vehicle Type: ${ticket.type}
        Spot Number: ${ticket.spotNumber}
        Entry Time: ${ticket.entryTime}
        -----------------------------`;
    }

    generateReceipt(ticket: Ticket, exit: Date, amount: number): string {
        return `
        ------ PARKING RECEIPT ------
        Ticket ID: ${ticket.id}
        Vehicle Type: ${ticket.type}
        Spot Number: ${ticket.spotNumber}
        Entry Time: ${ticket.entryTime}
        Exit Time: ${exit}
        Total Amount: ₹${amount}
        ------------------------------`;
    }

    abstract spotManager: SpotManager;
}
