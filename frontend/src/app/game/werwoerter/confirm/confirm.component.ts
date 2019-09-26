import {Component, Input, OnInit} from '@angular/core';
import {WerwoerterGame} from "../../../shared/model/werwoerter-dtos";
import {WerwoerterService} from "../werwoerter.service";
import {ProfileService} from "../../../shared/profile.service";

@Component({
  selector: 'confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  @Input() werwoerterGame : WerwoerterGame;

  constructor(private werwoerterService: WerwoerterService,
              private profileService: ProfileService) { }

  ngOnInit() {
  }

  send() {
    const gameName = this.werwoerterGame.game.name;
    const playerName = this.profileService.getCurrentIdentity().name;
    this.werwoerterService.confirm(gameName, playerName).subscribe(value => {
    });
  }

  getWaitingConfirmText(): string {
    if (this.werwoerterGame == null) {
      return "";
    }

    if (this.werwoerterGame.playersThatNeedToConfirm.length > 0) {
      let str = "Wir warten noch auf: ";
      this.werwoerterGame.playersThatNeedToConfirm.forEach( player => {
        str = str + player.name + " ";
      });
      return str;
    } else {
      return "Alle haben bestätigt.";
    }
  }

}
