import { VehicleType } from "../vehicle_type";
import { SpotManager } from "../spot_manager";
const RATE_PER_HOUR = 20;
export class FOUR_WHEELER_HEAVY extends VehicleType {
    static manager = new SpotManager(40);
    spotManager = FOUR_WHEELER_HEAVY.manager;

    constructor() {
        super(RATE_PER_HOUR);
    }
}