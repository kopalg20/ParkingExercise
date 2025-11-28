import { ParkingStrategy } from "../parking_strategies";
const MOTORCYCLE_FEES = { short: 40, medium: 60, perDay: 80 };
const CAR_FEES = { short: 60, medium: 80, perDay: 100 };

export class AirportStrategy extends ParkingStrategy {
  constructor() {
    super(200, 500, 0);
  }

  calculateFee(vehicleType: string, entry: Date, exit: Date): number {
    if(exit < entry) {
        throw new Error("Exit time cannot be before entry time");
    }
    const ms = exit.getTime() - entry.getTime();
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const days = Math.ceil(ms / (1000 * 60 * 60 * 24));
    const t = vehicleType.toLowerCase();

    if (t === "motorcycle" || t === "scooter") {
      if (hours < 1) return 0;
      if( hours < 8) return MOTORCYCLE_FEES.short;
      if (hours < 24) return MOTORCYCLE_FEES.medium;
      return days * MOTORCYCLE_FEES.perDay;
    }

    if (t === "car" || t === "suv") {
      if (hours < 12) return CAR_FEES.short;
      if (hours < 24) return CAR_FEES.medium;
      return days * 100;
    }

    throw new Error(`Unknown vehicle type for Airport: ${vehicleType}`);
  }
}
