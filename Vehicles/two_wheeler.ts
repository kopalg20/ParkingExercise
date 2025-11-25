import { VehicleType } from "../vehicle_type";
import { SpotManager } from "../spot_manager";
const RATE_PER_HOUR = 10;
export class TWO_WHEELER extends VehicleType {
    static manager = new SpotManager(100);
    spotManager = TWO_WHEELER.manager;

    constructor() {
        super(RATE_PER_HOUR);
    }
}