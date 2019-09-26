import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../../../shared/model/dtos";
import {ProfileService} from "../../../shared/profile.service";
import {WerwoelfleGame} from "../../../shared/model/werwoelfle-dtos";
import {WerwoelfleService} from "../werwoelfle.service";

@Component({
  selector: 'day-phase',
  templateUrl: './day-phase.component.html',
  styleUrls: ['./day-phase.component.scss']
})
export class DayPhaseComponent implements OnInit {

  @Input() werwoelfleGame : WerwoelfleGame;
  selectedPlayerName: string;

  constructor(private werwoelfleService: WerwoelfleService,
              private profileService: ProfileService) { }

  ngOnInit() {
  }

  getSelectablePlayers(): Player[] {
    if (this.werwoelfleGame == null) {
      return [];
    }
    const playerName = this.profileService.getCurrentIdentity().name;
    return this.werwoelfleGame.game.players.filter(player => player.name != playerName);
  }

  playerToStr(player: Player): string {
    return player.name;
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
    this.werwoelfleService.vote(this.werwoelfleGame.game.name, playerName, this.selectedPlayerName).subscribe(response => {
      console.log("received vote response: ", response);
    })
  }

  hasAlreadyVoted() {
    if (this.werwoelfleGame == null) {
      return true;
    }
    const playerName = this.profileService.getCurrentIdentity().name;
    return this.werwoelfleGame.votes.filter(vote => {
      return vote.fromName.localeCompare(playerName) == 0;
    }).length > 0;
  }

}

