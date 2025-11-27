import { ParkingStrategy } from "../parking_strategies";

export class AirportStrategy extends ParkingStrategy {
  constructor() {
    super(200, 500, 0);
  }

  calculateFee(vehicleType: string, entry: Date, exit: Date): number {
    if(exit < entry) {
        throw new Error("Exit time cannot be before entry time");
    }
    const ms = exit.getTime() - entry.getTime();
    const hours = Math.max(1, Math.ceil(ms / (1000 * 60 * 60)));
    const days = Math.ceil(ms / (1000 * 60 * 60 * 24));
    const t = vehicleType.toLowerCase();

    if (t === "motorcycle" || t === "scooter") {
      if (hours < 1) return 0;
      if( hours < 8) return 40;
      if (hours < 24) return 60;
      return days * 80;
    }

    if (t === "car" || t === "suv") {
      if (hours < 12) return 60;
      if (hours < 24) return 80;
      return days * 100;
    }

    throw new Error(`Unknown vehicle type for Airport: ${vehicleType}`);
  }
}
