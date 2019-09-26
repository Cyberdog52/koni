import {
  WerwoerterGame,
  WerwoerterMarker,
  WerwoerterPhase,
  WerwoerterRole
} from "../../shared/model/werwoerter-dtos";
import {Game, GameState, Player, PlayerState} from "../../shared/model/dtos";

export const player1 : Player = {
  name:  "player1",
  state: PlayerState.PLAYING
};

export const player2 : Player = {
  name: "player2",
  state: PlayerState.PLAYING
};

export const player3 : Player = {
  name: "player3",
  state: PlayerState.PLAYING
};

export const player4 : Player = {
  name: "player4",
  state: PlayerState.PLAYING
};

export const player5 : Player = {
  name: "player5",
  state: PlayerState.PLAYING
};

export const game : Game =  {
  gameType: undefined,
  name: "",
  creator: "player5",
  players: [player1, player2, player3, player4, player5],
  state: GameState.RUNNING
};

export const mockWerwoerterGame : WerwoerterGame= {
  game: game,
  guessedPlayers: [player1, player3],
  mayor: player2,
  phase: WerwoerterPhase.READ,
  playerToWerwoerterRoleMap: new Map([
    ["player1", WerwoerterRole.WEREWOLF],
    ["player2", WerwoerterRole.SEER],
    ["player3", WerwoerterRole.CITIZEN],
    ["player4", WerwoerterRole.CITIZEN],
    ["player5", WerwoerterRole.CITIZEN]
  ]),
  playersThatNeedToConfirm: [player2, player4],
  word: "asdf",
  playersThatVoted: [player3, player5],
  markers: [WerwoerterMarker.WORDFOUND, WerwoerterMarker.WRONGGUESS, WerwoerterMarker.CORRECTGUESS, WerwoerterMarker.CORRECTGUESS, WerwoerterMarker.WRONGTRACK, WerwoerterMarker.MAYBEGUESS, WerwoerterMarker.WRONGGUESS, WerwoerterMarker.CORRECTGUESS]
};
