import { Ticket } from "./ticket";
import { SpotManager } from "./spot_manager";
export abstract class VehicleType {
    ratePerHour: number;
    constructor(ratePerHour: number) {
        if (ratePerHour < 0) {
            throw new Error("ratePerHour cannot be negative");
        }
        this.ratePerHour = ratePerHour;
    }

    calculateCost(entry: Date, exit: Date): number {
        if (exit.getTime() < entry.getTime()) {
            throw new Error("Exit time cannot be before entry time");
        }
        const durationMs = exit.getTime() - entry.getTime();
        const hours = Math.max(1, Math.ceil(durationMs / (1000 * 60 * 60)));
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
        if(amount < 0) {
            throw new Error("Amount cannot be negative");
        }
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
