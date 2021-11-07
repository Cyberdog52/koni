export interface HousePointResponse {
  gryffindor: number,
  slytherin: number,
  hufflepuff: number,
  ravenclaw: number
}

export class HousePointHistory {

  constructor(house: House, reason: string, points: number) {
    this.house = house;
    this.reason = reason;
    this.points = points;
  }

  house: House;
  reason: string;
  points: number;
}

export enum House {
  SLYTHERIN="SLYTHERIN", GRYFFINDOR="GRYFFINDOR", HUFFLEPUFF="HUFFLEPUFF", RAVENCLAW="RAVENCLAW"
}
