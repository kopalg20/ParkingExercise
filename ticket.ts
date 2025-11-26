export class Ticket {
    constructor(
        public id: string,
        public spotNumber: number,
        public entryTime: Date,
        public type: string
    ) {
        if (typeof id !== "string" || id.trim() === "") {
            throw new Error("Invalid ticket ID");
        }
        if (typeof spotNumber !== "number" || spotNumber < 0 || !Number.isInteger(spotNumber)) {
            throw new Error("Invalid spot number");
        }
        if (!(entryTime instanceof Date) || isNaN(entryTime.getTime())) {
            throw new Error("Invalid entry time");
        }
        if (typeof type !== "string" || type.trim() === "") {
            throw new Error("Invalid vehicle type");
        }
    }
}