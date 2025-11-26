export class Ticket {
    constructor(
        public id: string,
        public spotNumber: number,
        public entryTime: Date,
        public type: string
    ) {}
}