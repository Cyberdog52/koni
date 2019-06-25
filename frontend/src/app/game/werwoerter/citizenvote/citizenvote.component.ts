import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../../../shared/model/dtos";
import {ProfileService} from "../../../shared/profile.service";
import {WerwoerterGame, WerwoerterRole} from "../../../shared/model/werwoerter-dtos";
import {WerwoerterService} from "../werwoerter.service";

@Component({
  selector: 'citizenvote',
  templateUrl: './citizenvote.component.html',
  styleUrls: ['./citizenvote.component.scss']
})
export class CitizenvoteComponent implements OnInit {

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
    return this.werwoerterGame.game.players.filter(player => player.identity.name.localeCompare(playerName) != 0);
  }

  playerToStr(player: Player): string {
    return player.identity.name;
  }

  getText(): string {
    return "Versuche einen Werwolf zu enttarnen!"
  }

  isSendSelectedPlayerDisabled() {
    return this.selectedPlayerName == null;
  }

  sendSelectedPlayer() {
    console.log("sending selected playerName: ", this.selectedPlayerName);
    const playerName = this.profileService.getCurrentIdentity().name;
    this.werwoerterService.sendGuessPlayer(this.werwoerterGame.game.name, playerName, this.selectedPlayerName).subscribe(response => {
      console.log("received sendGuessPlayer response: ", response);
    })
  }

  hasAlreadyVoted() {
    if (this.werwoerterGame == null) {
      return true;
    }
    const playerName = this.profileService.getCurrentIdentity().name;
    return this.werwoerterGame.playersThatVoted.filter(player => {
      return player.identity.name.localeCompare(playerName) == 0;
    }).length > 0;
  }

}

