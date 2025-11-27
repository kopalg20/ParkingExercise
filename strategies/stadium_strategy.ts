import { ParkingStrategy } from "../parking_strategies";
import { Ticket } from "../ticket";

export class StadiumStrategy extends ParkingStrategy {
  constructor() {
    super(1000, 1500, 0); 
  }

  calculateFee(vehicleType: string, entry: Date, exit: Date): number {
    if(exit < entry) {
        throw new Error("Exit time cannot be before entry time");
    }
    const ms = exit.getTime() - entry.getTime();
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const t = vehicleType.toLowerCase();

    if (t === "motorcycle" || t === "scooter") {
      if (hours <= 4) return 30;
      if (hours <= 12) return 30 + 60;
      const remaining = hours - 12;
      return 30 + 60 + 100 * remaining;
    }

    if (t === "car" || t === "suv") {
      if (hours <= 4) return 60;
      if (hours < 12) return 60 + 120;
      const remaining = hours - 12;
      return 60 + 120 + 200 * (remaining+1);
    }

    throw new Error(`The ${vehicleType} vehicle type not allowed in Stadium`);
  }
}
