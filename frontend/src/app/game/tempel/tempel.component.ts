import {Component, OnInit} from '@angular/core';
import {GameService} from "../../shared/game.service";
import {ProfileService} from "../../shared/profile.service";
import * as SockJS from "sockjs-client";
import {AppComponent} from "../../app.component";
import * as Stomp from "stompjs";
import {
  TempelCard,
  TempelCardType,
  TempelGame,
  TempelMessage,
  TempelRole,
  TempelState
} from "../../shared/model/tempel-dtos";
import {TempelGameService} from "./tempel.service";
import {Player} from "../../shared/model/dtos";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'tempel',
  templateUrl: './tempel.component.html',
  styleUrls: ['./tempel.component.scss']
})
export class TempelComponent implements OnInit {

  private stompClient;
  public tempelGame: TempelGame;
  private showSecretInfo: boolean;
  private mouseOverCard: TempelCard;
  private shownMessageIds: number[] = [];

  constructor(private gameService: GameService,
              private tempelGameService: TempelGameService,
              private toastrService: ToastrService,
              private profileService: ProfileService) { }

  ngOnInit() {
    this.tempelGame = null;
    this.initializeWebSocketConnection();
    this.getTempelGame();
  }

  initializeWebSocketConnection(){
    if (this.stompClient != null) {
      return;
    }
    let ws = new SockJS(AppComponent.getSocketUrl());
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.unsubscribe();
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
      this.handleChangeGameEvent(game);
        console.log("Game: ", this.tempelGame);
      }
    )
  }

  handleChangeGameEvent(newGame: TempelGame): void {
    if (newGame == null) {
      return;
    }
    if (this.tempelGame != null && (newGame.game.name != this.tempelGame.game.name || this.tempelGame.resetCount < newGame.resetCount)) {
      // this is a new game. reset state
      this.resetState();
    }

    this.showNewMessages(newGame.messages);

    if (this.tempelGame != null && this.tempelGame.round != newGame.round) {
      this.tempelGame.keyPlayer = null;
      const newOpenedCard = this.tempelGame.cards.find(tempelCard => tempelCard.id == newGame.lastOpenedCard.id);
      newOpenedCard.opened = true;
      setTimeout(()=>{
        this.tempelGame = newGame;
        }, 4000)
    } else {
      this.tempelGame = newGame;
    }
  }

  private resetState(): void {
    this.tempelGame = null;
    this.shownMessageIds = [];
    this.mouseOverCard = null;
  }

  private showNewMessages(messages: TempelMessage[]): void {
    if (messages == null || messages.length == 0) {
      return;
    }
    let newMessages = messages.filter(message => {return !this.shownMessageIds.includes(message.id)});
    newMessages = newMessages.sort((m1, m2) => m1.id - m2.id);

    if (newMessages.length > 3) {
      newMessages = newMessages.slice(newMessages.length -3, newMessages.length);
      messages
        .forEach(tempelMessage => {
          this.shownMessageIds.push(tempelMessage.id);
        });
    }

    newMessages
      .forEach(tempelMessage => {
        this.showMessage(tempelMessage);
      });
  }

  private showMessage(tempelMessage: TempelMessage): void {
    this.shownMessageIds.push(tempelMessage.id);
    if (tempelMessage.openedCardType != null) {
      switch (tempelMessage.openedCardType) {
        case TempelCardType.GOLD: {
          this.toastrService.success( tempelMessage.message, "Gold!", {
            positionClass: 'toast-bottom-right',
            timeOut: 8000,
            closeButton: true
          });
          break;
        }
        case TempelCardType.FALLE: {
          this.toastrService.error(tempelMessage.message, "Falle!", {
            positionClass: 'toast-bottom-right',
            timeOut: 8000,
            closeButton: true
          });
          break;
        }
        case TempelCardType.LEER: {
          this.toastrService.warning( tempelMessage.message, "Leer!", {
            positionClass: 'toast-bottom-right',
            timeOut: 8000,
            closeButton: true
          });
          break;
        }

      }
    } else {
      this.toastrService.info(tempelMessage.message , "Info", {
        positionClass: 'toast-bottom-right',
        timeOut: 4000,
        closeButton: true
      });
    }
  }

  getRoleText(): string {
    switch (this.tempelGame.playerToTempelRoleMap[this.profileService.getCurrentIdentity().name]) {
      case TempelRole.BUEB: return "Du bist ein Schatzjäger. ";
      case TempelRole.MEITLI: return "Du bist eine Wächterin. ";
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

  hasKey() : boolean{
    if (this.tempelGame == null || this.tempelGame.keyPlayer == null || this.gameFinished()) {
      return false;
    }
    const playerName = this.profileService.getCurrentIdentity().name;
    return this.tempelGame.keyPlayer.name == playerName;
  }

  keyText() {
    if (this.tempelGame == null || this.tempelGame.keyPlayer == null || this.gameFinished()) {
      return "";
    }
    return this.tempelGame.keyPlayer.name + " hat den Schlüssel. "
  }

  gameFinished() {
    return this.tempelGame.state == TempelState.BUEBWON || this.tempelGame.state == TempelState.MEITLIWON;
  }

  getFinishedTitle() {
    if (this.tempelGame.state == TempelState.BUEBWON) {
      return "Die Schatzjäger haben gewonnen."
    }
    if (this.tempelGame.state == TempelState.MEITLIWON) {
      return "Die Wächterinnen haben gewonnen."
    }
  }

  getFinishedExplanation() {
    let explanation = "";
    for (const player of this.tempelGame.game.players) {
      const key = player.name;
      const value = this.tempelGame.playerToTempelRoleMap[key];
      explanation += key + ": ";
      if (value == TempelRole.MEITLI) {
        explanation += "Wächterin"
      }
      if (value == TempelRole.BUEB) {
        explanation += "Schatzjäger"
      }
      explanation += " \n"
    }

    return explanation;
  }

  getCardsForPlayer(player: Player): TempelCard[] {
    function shuffle(array) {
      return array.sort(() => Math.random() - 0.5);
    }
    return shuffle(this.tempelGame.cards.filter(card => card.assignedPlayer != null).filter(card => card.assignedPlayer.name == player.name));
  }

  getImageURL(card: TempelCard) : string {
    const playerName = this.profileService.getCurrentIdentity().name;
    if (!card.opened) {
      if (this.hasKey() && this.mouseOverCard != null && this.mouseOverCard.id == card.id && playerName != card.assignedPlayer.name) {
        return this.getKeyUrl();
      }
      return "../../../assets/tempel/back.jpg"
    }

    return this.getOpenImageURL(card);
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

  openCardIfHasKey(player: Player, card: TempelCard) {
    const playerName = this.profileService.getCurrentIdentity().name;
    if (this.hasKey() && playerName != player.name && !card.opened) {
      this.tempelGame.keyPlayer = null;
      this.tempelGameService.open(this.tempelGame.game.name, card.id).subscribe(response => {
        console.log("opened card");
      })
    }
  }

  mouseIsOverCard(card: TempelCard) {
    if (this.hasKey()) {
      this.mouseOverCard = card;
    }
  }

  getCardsOwnPlayer(): TempelCard[] {
    if (this.tempelGame == null) {
      return [];
    }
    const playerName = this.profileService.getCurrentIdentity().name;
    const ownPlayer = this.tempelGame.game.players.find(player => player.name == playerName);
    function shuffle(array) {
      return array.sort(() => Math.random() - 0.5);
    }
    return shuffle(this.getCardsForPlayer(ownPlayer));
  }

  getOpenImageURL(card: TempelCard): string {
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
    return "";
  }

  restartGame() {
    const playerName = this.profileService.getCurrentIdentity().name;
    this.tempelGameService.restart(this.tempelGame.game.name, playerName).subscribe(result => {
      console.log(result);
    });
    this.resetState();
  }
}
