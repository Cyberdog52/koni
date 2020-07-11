import {Game, Player} from "./dtos";

export interface TempelGame {

  game: Game
  playerToTempelRoleMap: Map<string, TempelRole>
  keyPlayer: Player;
  cards: TempelCard[];
  round: number
  state: TempelState;
  totalGold: number
  totalFalle: number
  totalLeer: number
  lastOpenedCard: TempelCard;
  messages: TempelMessage[];
  resetCount: number;
}

export interface TempelCard {
  id: number
  tempelCardType: TempelCardType
  opened: boolean
  assignedPlayer: Player
}

export enum TempelCardType {
  FALLE = "FALLE", LEER = "LEER", GOLD = "GOLD"
}

export enum TempelRole {
  MEITLI = "MEITLI", BUEB = "BUEB"
}

export enum TempelState {
  RUNNING = "RUNNING", MEITLIWON = "MEITLIWON", BUEBWON = "BUEBWON"
}

export interface TempelMessage {
  id: number;
  message: string;
  openedCardType: TempelCardType;
}
