import { VehicleType } from "../vehicle_type";
import { SpotManager } from "../spot_manager";
const RATE_PER_HOUR = 20;
export class FOUR_WHEELER_LIGHT extends VehicleType {
    static manager = new SpotManager(80);
    spotManager = FOUR_WHEELER_LIGHT.manager;

    constructor() {
        super(RATE_PER_HOUR);
    }
}