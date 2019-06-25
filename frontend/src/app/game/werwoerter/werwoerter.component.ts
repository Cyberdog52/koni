import {Component, OnInit} from '@angular/core';
import {GameService} from "../../shared/game.service";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {AppComponent} from "../../app.component";
import {WerwoerterService} from "./werwoerter.service";
import {WerwoerterGame, WerwoerterPhase} from "../../shared/model/werwoerter-dtos";
import {ProfileService} from "../../shared/profile.service";
import {mockWerwoerterGame} from "./werwoerter-mock";

@Component({
  selector: 'werwoerter',
  templateUrl: './werwoerter.component.html',
  styleUrls: ['./werwoerter.component.scss']
})
export class WerwoerterComponent implements OnInit {

  private stompClient;
  public werwoerterGame: WerwoerterGame;

  constructor(private gameService: GameService,
              private werwoerterService: WerwoerterService,
              private profileService: ProfileService) { }

  ngOnInit() {
    this.initializeWebSocketConnection();
    this.getWerwoerterGame();
  }

  initializeWebSocketConnection(){
    let ws = new SockJS(AppComponent.getSocketUrl());
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/game", (message: Stomp.Message) => {
        const messageBody = message.body;
        if (messageBody.startsWith(that.getGameName())) {
          that.handleMessage(message.body);
        }
      });
    });
  }

  private getGameName(): string {
    const game = this.gameService.currentGame;
    if (game == null) {
      return "not found";
    } else {
      return game.name;
    }
  }

  private handleMessage(message: string) {
    this.getWerwoerterGame();
  }

  private getWerwoerterGame() {
    this.werwoerterService.getGame(this.getGameName()).subscribe( (game: WerwoerterGame) => {
      this.werwoerterGame = game;
      console.log("Game: ", this.werwoerterGame);
      }
    )
  }

  showConfirm() : Boolean {
    const playerName = this.profileService.getCurrentIdentity().name;
    if (!!this.werwoerterGame == false || !!this.werwoerterGame.playersThatNeedToConfirm == false) {
      return false;
    }
    return  this.werwoerterGame.playersThatNeedToConfirm.filter( player => {
      return player.identity.name.localeCompare(playerName) == 0
    }).length > 0;
  }

  showRole() {
    if (this.werwoerterGame != null) {
      return this.werwoerterGame.phase==WerwoerterPhase.ROLE;
    }
    return false;
  }

  showCitizenVote() : Boolean {
    if (this.werwoerterGame != null) {
      return this.werwoerterGame.phase==WerwoerterPhase.CITIZENVOTE;
    }
    return false;
  }

  showWerevote() : Boolean {
    if (this.werwoerterGame != null) {
      return this.werwoerterGame.phase==WerwoerterPhase.WEREVOTE;
    }
    return false;
  }

  showWerewolfsWon() : Boolean {
    if (this.werwoerterGame != null) {
      return this.werwoerterGame.phase==WerwoerterPhase.WEREWOLFSWON;
    }
    return false;
  }

  showCitizenWon() : Boolean {
    if (this.werwoerterGame != null) {
      return this.werwoerterGame.phase==WerwoerterPhase.CITIZENWON;
    }
    return false;
  }

  showAsk() : Boolean {
    if (this.werwoerterGame != null) {
      return this.werwoerterGame.phase==WerwoerterPhase.ASK;
    }
    return false;
  }

  showRead() : Boolean {
    if (this.werwoerterGame != null) {
      return this.werwoerterGame.phase==WerwoerterPhase.READ;
    }
    return false;
  }
}
