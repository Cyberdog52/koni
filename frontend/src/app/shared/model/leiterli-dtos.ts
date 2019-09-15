import {Game, Player} from "./dtos";

export interface LeiterliGame {
  game: Game
  playerToNumberMap: Map<string, number>
  playersThatNeedToRoll: Player[]
  board: LeiterliBoard
  history: LeiterliHistoryBlock[]
  maxFields: number
  avatarNames: string[]
  playerToAvatarMap: Map<string, string>
}

export interface LeiterliField {
  number: number
  move: number
  visited: boolean
}

export interface LeiterliBoard {
  fields: LeiterliField[]
}

export interface LeiterliHistoryBlock {
  player: Player
  roll: number
  previousField: number
  currentField: number
}
