import {Component, OnInit} from '@angular/core';
import {Game, GameState, GameType} from "../shared/model/dtos";
import {LobbyService} from "./lobby.service";
import {MessageService} from "../shared/message.service";
import {ProfileService} from "../shared/profile.service";
import {GameService} from "../shared/game.service";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Router} from "@angular/router";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  allGames: Game[] = [];

  selectedGameType: GameType;
  gameTypes = [GameType.WERWOERTER, GameType.LEITERLI];

  //TODO: adjust per game
  MIN_PLAYER_PER_GAME: number = 1;

  private stompClient;

  constructor(private lobbyService: LobbyService,
              private messageService: MessageService,
              private profileService: ProfileService,
              private gameService: GameService,
              private router: Router) {
  }

  ngOnInit() {
    this.fetchGames();
    this.initializeWebSocketConnection();
  }

  fetchGames() {
    this.lobbyService.getGames().subscribe(games => {
      console.log("Fetched allGames: ", games);
      this.allGames = games;
    });
  }

  getCreatedGames(): Game[] {
    return this.allGames.filter(game => game.state == GameState.CREATED);
  }

  getRunningGames(): Game[] {
    return this.allGames.filter(game => game.state == GameState.RUNNING);
  }

  getFinishedGames(): Game[] {
    return this.allGames.filter(game => game.state == GameState.FINISHED);
  }


  createGame() {
    this.isShowingCreateMenu = false;
    this.lobbyService.createGame(this.getNewGameName(), this.selectedGameType).subscribe(game => {
      this.fetchGames();
      this.subscribeTo(game)
    });
    this.selectedGameType = null;
  }

  joinGame(game: Game) {
    this.lobbyService.joinGame(game.name).subscribe(game => {
      this.fetchGames();
      this.subscribeTo(game);
    });
  }
  private subscribeTo(game: Game) {
    this.gameService.subscribe(game);
  }

  private unsubscribeTo(game: Game) {
    this.gameService.unsubscribe(game);
  }

  startGame(game: Game) {
    this.lobbyService.startGame(game).subscribe(value =>
      console.log(value));
  }

  alreadyJoined(game: Game) {
    const name = this.profileService.getCurrentIdentity().name;
    return game.players.filter(player => {
      return player.name == name;
    }).length > 0;
  }

  getJoinedGame(): Game {
    if (this.getCreatedGames() == null) {
      return null;
    }
    const games = this.getCreatedGames().filter(game => {
      return this.hasPlayerJoined(game);
    });

    //TODO: also filter for running games

    if (games.length == 1) {
      return games[0];
    } else {
      return null;
    }
  }

  private hasPlayerJoined(game: Game) {
    const name = this.profileService.getCurrentIdentity().name;
    return game.players.filter( player => {
      return player.name.localeCompare(name) == 0;
    }).length > 0;
  }

  concat = (x, y) =>
    x.concat(y);
  flatMap = (f, xs) =>
    xs.map(f).reduce(this.concat, []);

  isStartGameDisabled(game: Game): Boolean {
    return game.players.length < this.MIN_PLAYER_PER_GAME || !this.hasPlayerJoined(game) || !this.hasCreated(game);
  }

  hasCreated(game: Game) {
    console.log("Creator: " + game.creator);
    console.log("Identity: " + this.profileService.getCurrentIdentity().name);
    return game.creator == this.profileService.getCurrentIdentity().name;
  }

  isJoinDisabled(game: Game) {
    return this.getJoinedGame() != null;
  }

  leave(game: Game) {
    this.lobbyService.leaveGame(game.name).subscribe(  returnedGame => {
      this.fetchGames();
      this.unsubscribeTo(returnedGame);
    });

  }

  delete(game: Game) {
    this.lobbyService.deleteGame(game.name).subscribe(  returnedGame => {
      this.fetchGames();
    });

  }

  isLeaveDisabled(game: Game) {
    return !this.alreadyJoined(game)
  }

  createGameDisabled() {
    let hasAlreadyJoinedGame = this.hasAlreadyJoinedGame();
    let hasNotSelectedGameType = this.selectedGameType == null;
    return hasAlreadyJoinedGame || hasNotSelectedGameType;
  }

  hasAlreadyJoinedGame(): Boolean {
    return this.getJoinedGame() != null;
  }

  isDeleteHidden(game: Game) {
    return game.players.length > 0;
  }

  getIconForGame(game: Game): string {
    if (game== null) {
      return "";
    }
    switch (game.gameType) {
      case GameType.WERWOERTER: {
        return "assets/werwoerter/icon.jpg";
      }
      case GameType.SECRET: {
        return "assets/secret/icon.jpg";
      }
      case GameType.WERWOELFLE: {
        return "assets/werwoelfle/icon.jpg";
      }
      case GameType.LEITERLI : {
        return "assets/leiterli/logoleiterli.png";
      }
    }
  }

  initializeWebSocketConnection(){
    let ws = new SockJS(AppComponent.getSocketUrl());
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/lobby", (message: Stomp.Message) => {

        //check start of game
        const joinedGame = that.getJoinedGame();
        if (joinedGame != null) {
          const joinedGameCommand = 'START ' + joinedGame.name;
          if (message.body.toString().localeCompare(joinedGameCommand) == 0) {
            that.switchToJoinedGame(joinedGame);
          }
        }
        that.fetchGames();
      });
    });
  }

  private switchToJoinedGame(joinedGame: Game) {
    this.gameService.currentGame = joinedGame;
    this.router.navigateByUrl('/game');
  }

  gameTypeToStr(gameType: GameType) {
    switch (gameType) {
      case GameType.WERWOERTER: {
        return "Werwörter";
      }
      case GameType.SECRET: {
        return "Secret Hitler";
      }
      case GameType.WERWOELFLE: {
        return "Werwölfle";
      }
      case GameType.LEITERLI: {
        return "Leiterli";
      }
    }
  }

  isShowingCreateMenu: Boolean = false;

  createButtonHidden() {
    return this.isShowingCreateMenu;
  }

  showCreateMenu() {
    this.isShowingCreateMenu = true;
    this.selectedGameType = null;
  }

  showCreateCard() {
    return !this.isShowingCreateMenu && !this.hasAlreadyJoinedGame();
  }

  private getNewGameName() {
    let gameName = this.gameTypeToStr(this.selectedGameType);
    const playerName = this.profileService.getCurrentIdentity().name;
    gameName = gameName + "-" + playerName + "-" + (this.allGames.length + 1).toString();
    return gameName;
  }

  isReconnectEnabled(game: Game): boolean {
    const playerName = this.profileService.getCurrentIdentity().name;
    return game.players.filter( player => {
      return player.name == playerName
    }).length == 1;
  }

  reconnect(game: Game) {
    this.switchToJoinedGame(game);
  }

  isDestroyGameEnabled(game: Game): boolean {
    console.log("checking destroy enabled");
    return this.hasCreated(game) ;
  }
}

