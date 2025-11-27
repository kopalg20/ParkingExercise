import { ParkingStrategy } from "../parking_strategies";
const RATE_PER_HOUR_MOTORCYCLE = 10;
const RATE_PER_HOUR_CAR = 20;
const RATE_PER_HOUR_TRUCK = 50;
export class MallStrategy extends ParkingStrategy {
  constructor() {
    super(100, 80, 10);
  }

  calculateFee(vehicleType: string, entry: Date, exit: Date): number {
    if(exit < entry) {
        throw new Error("Exit time cannot be before entry time");
    }
    const ms = exit.getTime() - entry.getTime();
    const hours = Math.max(1, Math.ceil(ms / (1000 * 60 * 60)));

    const t = vehicleType.toLowerCase();
    if (t === "motorcycle" || t === "scooter") return hours * RATE_PER_HOUR_MOTORCYCLE;
    if (t === "car" || t === "suv") return hours * RATE_PER_HOUR_CAR;
    if (t === "truck" || t === "bus") return hours * RATE_PER_HOUR_TRUCK;
    throw new Error(`Unknown vehicle type for Mall: ${vehicleType}`);
  }
}
