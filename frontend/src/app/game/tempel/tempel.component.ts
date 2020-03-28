import {Component, OnInit} from '@angular/core';
import {GameService} from "../../shared/game.service";
import {ProfileService} from "../../shared/profile.service";
import * as SockJS from "sockjs-client";
import {AppComponent} from "../../app.component";
import * as Stomp from "stompjs";
import {TempelCard, TempelCardType, TempelGame, TempelRole, TempelState} from "../../shared/model/tempel-dtos";
import {TempelGameService} from "./tempel.service";
import {Player} from "../../shared/model/dtos";
import {WerwoelfleRole} from "../../shared/model/werwoelfle-dtos";

@Component({
  selector: 'tempel',
  templateUrl: './tempel.component.html',
  styleUrls: ['./tempel.component.scss']
})
export class TempelComponent implements OnInit {

  private stompClient;
  public tempelGame: TempelGame;
  private selectedPlayerName: string;
  private showSecretInfo: boolean;

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

  getRoleText(): string {
    switch (this.tempelGame.playerToTempelRoleMap[this.profileService.getCurrentIdentity().name]) {
      case TempelRole.BUEB: return "Du bisch en Bueb. ";
      case TempelRole.MEITLI: return "Du bisch es Meitli. ";
    }
  }

  getCardsText() : string {
    const playerName = this.profileService.getCurrentIdentity().name;
    const myCards = this.tempelGame.cards.filter(card => card.assignedPlayer != null).filter(card => card.assignedPlayer.name == playerName);
    const myGold = myCards.filter(card => card.tempelCardType == TempelCardType.GOLD).length;
    const myFalle = myCards.filter(card => card.tempelCardType == TempelCardType.FALLE).length;
    const myLeer = myCards.filter(card => card.tempelCardType == TempelCardType.LEER).length;

    return "Du hast " + myGold + " Gold, " + myFalle + " Falle, " + myLeer + " Leer.";
  }

  getRoundText() {
    return this.tempelGame.round;
  }

  getTotalCountText(): string {
    const openedCards = this.tempelGame.cards.filter(card => card.opened);
    const openedGold = openedCards.filter(card => card.tempelCardType == TempelCardType.GOLD).length;
    const openedFallen = openedCards.filter(card => card.tempelCardType == TempelCardType.FALLE).length;
    const openedLeer = openedCards.filter(card => card.tempelCardType == TempelCardType.LEER).length;

    return "Gold: " + openedGold + "/" + this.tempelGame.totalGold + "\nFalle: " + openedFallen + "/" + this.tempelGame.totalFalle +  "\n Leer: " + openedLeer + "/" + this.tempelGame.totalLeer;
  }

  getSelectablePlayers(): Player[] {
    const playerName = this.profileService.getCurrentIdentity().name;
    return this.tempelGame.game.players.filter(player => player.name != playerName);
  }

  playerToStr(player: Player): string {
    return player.name;
  }

  isOpenSelectedPlayerEnabled() {
    return this.selectedPlayerName == null;
  }

  openSelectedPlayer() {
    console.log("sending selected playerName: ", this.selectedPlayerName);
    const playerName = this.profileService.getCurrentIdentity().name;
    this.tempelGameService.open(this.tempelGame.game.name, this.selectedPlayerName).subscribe(response => {
      console.log("opened card");
      this.selectedPlayerName = null;
    })
  }

  hasKey() : boolean{
    const playerName = this.profileService.getCurrentIdentity().name;
    return this.tempelGame.keyPlayer.name == playerName;
  }

  keyText() {
    return "Spieler " + this.tempelGame.keyPlayer.name + " hat den Schlüssel. "
  }

  gameFinished() {
    return this.tempelGame.state == TempelState.BUEBWON || this.tempelGame.state == TempelState.MEITLIWON;
  }

  getFinishedTitle() {
    if (this.tempelGame.state == TempelState.BUEBWON) {
      return "Die Bueben haben gewonnen."
    }
    if (this.tempelGame.state == TempelState.MEITLIWON) {
      return "Die Meitlis haben gewonnen."
    }
  }

  getFinishedExplanation() {
    let explanation = "";
    for (const player of this.tempelGame.game.players) {
      const key = player.name;
      const value = this.tempelGame.playerToTempelRoleMap[key];
      explanation += key + ": ";
      if (value == TempelRole.MEITLI) {
        explanation += "Meitli"
      }
      if (value == TempelRole.BUEB) {
        explanation += "Bueb"
      }
      explanation += " \n"
    }

    return explanation;
  }

  getCardsForPlayer(player: Player): TempelCard[] {
    return this.tempelGame.cards.filter(card => card.assignedPlayer != null).filter(card => card.assignedPlayer.name == player.name);
  }

  getImageURL(card: TempelCard) {
    if (!card.opened) {
      return "../../../assets/tempel/back.jpg"
    }
    switch (card.tempelCardType) {
      case TempelCardType.GOLD: {
        return "../../../assets/tempel/schatz.jpg"
      }
      case TempelCardType.FALLE: {
        return "../../../assets/tempel/falle.jpg"
      }
      case TempelCardType.LEER: {
        return "../../../assets/tempel/leer.jpg"
      }

    }
  }

  toggleSecretInfo(): void {
    this.showSecretInfo = !this.showSecretInfo;
  }

  secretInfoText(): string {
    if (!this.showSecretInfo) {
      return "Zeige geheime Info"
    }
    return "Verstecke geheime Info"
  }

  getKeyUrl() {
    return "../../../assets/tempel/key.jpg"
  }

  getRoleImageUrl() {
    switch (this.tempelGame.playerToTempelRoleMap[this.profileService.getCurrentIdentity().name]) {
      case TempelRole.BUEB: return "../../../assets/tempel/bueb.jpg";
      case TempelRole.MEITLI: return "../../../assets/tempel/meitli.jpg";
    }
  }
}
