import {VehicleType} from "./vehicle_type";
import {FOUR_WHEELER_HEAVY} from "./Vehicles/four_wheeler_heavy";
import {FOUR_WHEELER_LIGHT} from "./Vehicles/four_wheeler_light";
import {TWO_WHEELER} from "./Vehicles/two_wheeler";
export class VehicleFactory {
    static create(type: string): VehicleType {
        switch (type) {
            case "motorcycle":
            case "scooter":
                return new TWO_WHEELER();

            case "car":
            case "suv":
                return new FOUR_WHEELER_LIGHT();

            case "bus":
            case "truck":
                return new FOUR_WHEELER_HEAVY();
            default:
                throw new Error("Invalid vehicle type");
        }
    }
}
