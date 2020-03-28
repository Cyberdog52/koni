import {Component, OnInit} from '@angular/core';
import {GameService} from "../../shared/game.service";
import {ProfileService} from "../../shared/profile.service";
import * as SockJS from "sockjs-client";
import {AppComponent} from "../../app.component";
import * as Stomp from "stompjs";
import {TempelGame} from "../../shared/model/tempel-dtos";
import {TempelGameService} from "./tempel.service";

@Component({
  selector: 'tempel',
  templateUrl: './tempel.component.html',
  styleUrls: ['./tempel.component.scss']
})
export class TempelComponent implements OnInit {

  private stompClient;
  public tempelGame: TempelGame;

  constructor(private gameService: GameService,
              private tempelGameService: TempelGameService,
              private profileService: ProfileService) { }

  ngOnInit() {
    this.initializeWebSocketConnection();
    this.getTempelGame();
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
    this.getTempelGame();
  }

  private getTempelGame() {
    this.tempelGameService.getGame(this.getGameName()).subscribe( (game: TempelGame) => {
        this.tempelGame = game;
        console.log("Game: ", this.tempelGame);
      }
    )
  }

}
