import {Game, Player} from "./dtos";

export interface WerwoerterGame {
  game: Game
  playerToWerwoerterRoleMap: Map<string, WerwoerterRole>
  mayor: Player
  playersThatNeedToConfirm: Player[]
  phase: WerwoerterPhase
  word: string
  guessedPlayers: Player[]
  markers: WerwoerterMarker[]
  playersThatVoted: Player[]
}

export enum WerwoerterMarker {
  WORDFOUND = "WORDFOUND",
  WORDNOTFOUND = "WORDNOTFOUND",
  CORRECTGUESS = "CORRECTGUESS",
  WRONGGUESS = "WRONGGUESS",
  MAYBEGUESS = "MAYBEGUESS",
  WRONGTRACK= "WRONGTRACK",
  CLOSE = "CLOSE"
}

export enum WerwoerterPhase {
  ROLE = "ROLE",
  READ = "READ",
  ASK = "ASK",
  WEREVOTE = "WEREVOTE",
  CITIZENVOTE = "CITIZENVOTE",
  WEREWOLFSWON = "WEREWOLFSWON",
  CITIZENWON = "CITIZENWON"
}

export enum WerwoerterRole {
  WEREWOLF = "WEREWOLF",
  SEER = "SEER",
  CITIZEN = "CITIZEN"
}
