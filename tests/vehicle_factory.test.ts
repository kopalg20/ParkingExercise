import { VehicleFactory } from "../vehicle_factory";
import { TWO_WHEELER } from "../Vehicles/two_wheeler";
import { FOUR_WHEELER_LIGHT } from "../Vehicles/four_wheeler_light";
import { FOUR_WHEELER_HEAVY } from "../Vehicles/four_wheeler_heavy";
import { VehicleType } from "../vehicle_type";

describe("VehicleFactory Tests", () => {

    const isInstance = (obj: any, classType: any) => obj instanceof classType;

    test("should return TWO_WHEELER for motorcycle", () => {
        const vehicle = VehicleFactory.create("motorcycle");
        expect(isInstance(vehicle, TWO_WHEELER)).toBe(true);
    });

    test("should return TWO_WHEELER for scooter", () => {
        const vehicle = VehicleFactory.create("scooter");
        expect(isInstance(vehicle, TWO_WHEELER)).toBe(true);
    });

    test("should return FOUR_WHEELER_LIGHT for car", () => {
        const vehicle = VehicleFactory.create("car");
        expect(isInstance(vehicle, FOUR_WHEELER_LIGHT)).toBe(true);
    });

    test("should return FOUR_WHEELER_LIGHT for suv", () => {
        const vehicle = VehicleFactory.create("suv");
        expect(isInstance(vehicle, FOUR_WHEELER_LIGHT)).toBe(true);
    });

    test("should return FOUR_WHEELER_HEAVY for bus", () => {
        const vehicle = VehicleFactory.create("bus");
        expect(isInstance(vehicle, FOUR_WHEELER_HEAVY)).toBe(true);
    });

    test("should return FOUR_WHEELER_HEAVY for truck", () => {
        const vehicle = VehicleFactory.create("truck");
        expect(isInstance(vehicle, FOUR_WHEELER_HEAVY)).toBe(true);
    });


    test("should throw error for completely invalid type", () => {
        expect(() => VehicleFactory.create("bicycle")).toThrow("Invalid vehicle type");
    });

    test("should throw error for empty string input", () => {
        expect(() => VehicleFactory.create("")).toThrow("Invalid vehicle type");
    });

    test("should throw error for whitespace input", () => {
        expect(() => VehicleFactory.create("   ")).toThrow("Invalid vehicle type");
    });

    test("should throw error for random special characters", () => {
        expect(() => VehicleFactory.create("#$%@@")).toThrow("Invalid vehicle type");
    });

    test("should throw error for alphanumeric mixed case", () => {
        expect(() => VehicleFactory.create("Car123")).toThrow("Invalid vehicle type");
    });



    test("should treat uppercase inputs as invalid (strict matching)", () => {
        expect(() => VehicleFactory.create("CAR")).toThrow("Invalid vehicle type");
        expect(() => VehicleFactory.create("TRUCK")).toThrow("Invalid vehicle type");
        expect(() => VehicleFactory.create("MOTORCYCLE")).toThrow("Invalid vehicle type");
    });


    test("should throw error for number input", () => {
        expect(() => VehicleFactory.create(123 as any)).toThrow("Invalid vehicle type");
    });

    test("should throw error for boolean input", () => {
        expect(() => VehicleFactory.create(true as any)).toThrow("Invalid vehicle type");
    });

    test("should throw error for null", () => {
        expect(() => VehicleFactory.create(null as any)).toThrow("Invalid vehicle type");
    });

    test("should throw error for undefined", () => {
        expect(() => VehicleFactory.create(undefined as any)).toThrow("Invalid vehicle type");
    });

    test("should throw error for object input", () => {
        expect(() => VehicleFactory.create({ type: "car" } as any)).toThrow("Invalid vehicle type");
    });

    test("should throw error for array input", () => {
        expect(() => VehicleFactory.create(["car"] as any)).toThrow("Invalid vehicle type");
    });


    test("all returned objects must extend VehicleType", () => {
        const vehicle = VehicleFactory.create("car");
        expect(vehicle instanceof VehicleType).toBe(true);
    });

});
