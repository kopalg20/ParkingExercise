import { SpotManager } from "./spot_manager";
import { Ticket } from "./ticket";

export abstract class ParkingStrategy {
  motorcycleSpots: SpotManager;
  carSpots: SpotManager;
  truckSpots: SpotManager;

  constructor(moto: number, car: number, truck: number) {
    this.motorcycleSpots = new SpotManager(moto);
    this.carSpots = new SpotManager(car);
    this.truckSpots = new SpotManager(truck);
  }

  getFreeSpot(vehicleType: string): number | null {
    const t = vehicleType.toLowerCase();
    if (t === "motorcycle" || t === "scooter") return this.motorcycleSpots.getFreeSpot();
    if (t === "car" || t === "suv") return this.carSpots.getFreeSpot();
    if (t === "truck" || t === "bus") return this.truckSpots.getFreeSpot();
    return null;
  }

  releaseSpot(vehicleType: string, spot: number): void {
    const t = vehicleType.toLowerCase();
    if (t === "motorcycle" || t === "scooter") return this.motorcycleSpots.releaseSpot(spot);
    if (t === "car" || t === "suv") return this.carSpots.releaseSpot(spot);
    if (t === "truck" || t === "bus") return this.truckSpots.releaseSpot(spot);
  }

  abstract calculateFee(vehicleType: string, entry: Date, exit: Date): number;

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
}
