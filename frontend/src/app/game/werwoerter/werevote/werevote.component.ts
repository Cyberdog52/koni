import {Component, Input, OnInit} from '@angular/core';
import {WerwoerterGame, WerwoerterRole} from "../../../shared/model/werwoerter-dtos";
import {Player} from "../../../shared/model/dtos";
import {WerwoerterService} from "../werwoerter.service";
import {ProfileService} from "../../../shared/profile.service";
import {player1, player2, player3} from "../werwoerter-mock";

@Component({
  selector: 'werevote',
  templateUrl: './werevote.component.html',
  styleUrls: ['./werevote.component.scss']
})
export class WerevoteComponent implements OnInit {

  @Input() werwoerterGame : WerwoerterGame;
  selectedPlayerName: string;

  constructor(private werwoerterService: WerwoerterService,
              private profileService: ProfileService) { }

  ngOnInit() {
  }

  getSelectablePlayers(): Player[] {
    if (this.werwoerterGame == null) {
      return [];
    }
    const playerName = this.profileService.getCurrentIdentity().name;
    return this.werwoerterGame.game.players.filter(player => player.name.localeCompare(playerName) != 0);
  }

  playerToStr(player: Player): string {
    return player.name;
  }

  isWerewolf() {
    const role = this.werwoerterService.getRole(this.werwoerterGame);
    if (role == null) {
      return false;
    }
    return role == WerwoerterRole.WEREWOLF;
  }

  getWerwolfText() {
    if (this.werwoerterGame == null) {
      return "";
    }
    return "Letzte Chance! " +
      "Die Dorfgemeinschaft hat das geheime Wort herausgefunden. " +
      "Das geheime Wort war " + this.werwoerterGame.word + ". " +
      "Versuche die Seherin herauszufinden."
  }

  getRestText(): string {
    if (this.werwoerterGame == null) {
      return "";
    }
    return "Glückwunsch, ihr habt das Wort herausgefunden. " +
      "Das geheime Wort war " + this.werwoerterGame.word + ". " +
      "Es besteht aber eine letzte Chance, dass die Werwölfe gewinnen. " +
      "Die Werwölfe versuchen gerade, die Seherin herauszufinden. " +
      "Falls sie die Seherin enttarnen, gewinnen die Werwölfe! "
  }

  isSendSelectedPlayerDisabled() {
    return !this.isWerewolf() || this.selectedPlayerName == null;
  }

  sendSelectedPlayer() {
    console.log("sending selected playerName: ", this.selectedPlayerName);
    const playerName = this.profileService.getCurrentIdentity().name;
    this.werwoerterService.sendGuessPlayer(this.werwoerterGame.game.name, playerName, this.selectedPlayerName).subscribe(response => {
      console.log("received vote response: ", response);
    })
  }

  hasAlreadyVoted() {
    if (this.werwoerterGame == null) {
      return true;
    }
    const playerName = this.profileService.getCurrentIdentity().name;
    return this.werwoerterGame.playersThatVoted.filter(player => {
      return player.name == playerName;
    }).length > 0;
  }
}
