import { ParkingStrategy } from "./parking_strategies";
import { MallStrategy } from "./strategies/mall_strategy";
import { StadiumStrategy } from "./strategies/stadium_strategy";
import { AirportStrategy } from "./strategies/airport_strategy";

export enum LotType{
    MALL = "mall",
    STADIUM = "stadium",
    AIRPORT = "airport"
}

export function getStrategy(lotType: LotType): ParkingStrategy {
  switch (lotType) {
    case "mall":
      return new MallStrategy();
    case "stadium":
      return new StadiumStrategy();
    case "airport":
      return new AirportStrategy();
    default:
      throw new Error(`Unknown lot type: ${lotType}`);
  }
}
