import {Component, OnInit} from '@angular/core';
import {GameService} from "../../shared/game.service";
import {ProfileService} from "../../shared/profile.service";
import * as SockJS from "sockjs-client";
import {AppComponent} from "../../app.component";
import * as Stomp from "stompjs";
import {WerwoelfleService} from "./werwoelfle.service";
import {WerwoelfleGame, WerwoelflePhase} from "../../shared/model/werwoelfle-dtos";

@Component({
  selector: 'werwoelfle',
  templateUrl: './werwoelfle.component.html',
  styleUrls: ['./werwoelfle.component.scss']
})
export class WerwoelfleComponent implements OnInit {

  private stompClient;
  public werwoelfleGame: WerwoelfleGame;

  constructor(private gameService: GameService,
              private werwoelfleService: WerwoelfleService,
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
    this.werwoelfleService.getGame(this.getGameName()).subscribe( (game: WerwoelfleGame) => {
        this.werwoelfleGame = game;
        console.log("Game: ", this.werwoelfleGame);
      }
    )
  }

  showConfirm() : Boolean {
    const playerName = this.profileService.getCurrentIdentity().name;
    if (!!this.werwoelfleGame == false || !!this.werwoelfleGame.playersThatNeedToConfirm == false) {
      return false;
    }
    return  this.werwoelfleGame.playersThatNeedToConfirm.filter(player => {
      return player.name.localeCompare(playerName) == 0
    }).length > 0;
  }

  showRole() {
    if (this.werwoelfleGame != null) {
      return this.werwoelfleGame.phase==WerwoelflePhase.ROLE;
    }
    return false;
  }

  showDayPhase() : Boolean {
    if (this.werwoelfleGame != null) {
      return this.werwoelfleGame.phase==WerwoelflePhase.DAYPHASE;
    }
    return false;
  }

  showWerewolfPhase() : Boolean {
    if (this.werwoelfleGame != null) {
      return this.werwoelfleGame.phase==WerwoelflePhase.WEREWOLFPHASE;
    }
    return false;
  }

  showWerewolfsWon() : Boolean {
    if (this.werwoelfleGame != null) {
      return this.werwoelfleGame.phase==WerwoelflePhase.WEREWOLFSWON;
    }
    return false;
  }

  showCitizenWon() : Boolean {
    if (this.werwoelfleGame != null) {
      return this.werwoelfleGame.phase==WerwoelflePhase.CITIZENWON;
    }
    return false;
  }
}
