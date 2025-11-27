import { ParkingStrategy } from "../parking_strategies";

const MOTORCYCLE_RATES = { first4Hours: 30, next8Hours: 60, additionalHour: 100 };
const CAR_RATES = { first4Hours: 60, next8Hours: 120, additionalHour: 200 };

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
      if (hours <= 4) return MOTORCYCLE_RATES.first4Hours;
      if (hours <= 12) return MOTORCYCLE_RATES.first4Hours + MOTORCYCLE_RATES.next8Hours;
      const remaining = hours - 12;
      return MOTORCYCLE_RATES.first4Hours +MOTORCYCLE_RATES.next8Hours + MOTORCYCLE_RATES.additionalHour * remaining;
    }

    if (t === "car" || t === "suv") {
      if (hours <= 4) return CAR_RATES.first4Hours;
      if (hours < 12) return  CAR_RATES.first4Hours + CAR_RATES.next8Hours;
      const remaining = hours - 12;
      return CAR_RATES.first4Hours + CAR_RATES.next8Hours + CAR_RATES.additionalHour * (remaining+1);
    }

    throw new Error(`The ${vehicleType} vehicle type not allowed in Stadium`);
  }
}
