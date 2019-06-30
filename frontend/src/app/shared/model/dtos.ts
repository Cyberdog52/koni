export interface Identity {
  name: string
}

export interface Profile {
  id?: number
  identity: Identity
  password_plain?: string
  password_encrypted?: number[]
  salt?: number[]
}

export interface Game {
  name: string
  players: Player[]
  state: GameState
  gameType: GameType
}

export enum GameType {
  WERWOERTER = "WERWOERTER",
  SECRET = "SECRET",
  WERWOELFLE = "WERWOELFLE"
}

export enum GameState {
  RUNNING = "RUNNING",
  FINISHED = "FINISHED",
  CREATED = "CREATED",
  DELETED = "DELETED"
}

export interface Player {
  identity: Identity
  state: PlayerState
}

export enum PlayerState {
  JOINED, PLAYING, FINISHED
}

