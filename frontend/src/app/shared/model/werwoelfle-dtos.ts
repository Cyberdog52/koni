import {Game, Player} from "./dtos";

export interface WerwoelfleGame {
  game: Game
  playerToWerwoelfleRoleMap: Map<string, WerwoelfleRole>
  mayor: Player
  playersThatNeedToConfirm: Player[]
  phase: WerwoelflePhase
  votes: Vote[]
  dyingPlayers: Player[]
  history: HistoryBlock[]
}

export enum WerwoelflePhase {
  ROLE = "ROLE",
  WEREWOLFPHASE = "WEREWOLFPHASE",
  DAYPHASE = "DAYPHASE",
  WEREWOLFSWON = "WEREWOLFSWON",
  CITIZENWON = "CITIZENWON"
}

export enum WerwoelfleRole {
  WEREWOLF = "WEREWOLF",
  SEER = "SEER",
  CITIZEN = "CITIZEN"
}

export interface HistoryBlock {
  phase: WerwoelflePhase
  votes: Vote[]
}

export interface Vote {
  fromName: string
  toName: string
}
