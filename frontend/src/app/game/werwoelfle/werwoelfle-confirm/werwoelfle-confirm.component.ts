import {Component, Input, OnInit} from '@angular/core';
import {ProfileService} from "../../../shared/profile.service";
import {WerwoelfleGame} from "../../../shared/model/werwoelfle-dtos";
import {WerwoelfleService} from "../werwoelfle.service";

@Component({
  selector: 'werwoelfle-confirm',
  templateUrl: './werwoelfle-confirm.component.html',
  styleUrls: ['./werwoelfle-confirm.component.scss']
})
export class WerwoelfleConfirmComponent implements OnInit {

  @Input() werwoelfleGame : WerwoelfleGame;

  constructor(private werwoelfleService: WerwoelfleService,
              private profileService: ProfileService) { }

  ngOnInit() {
  }

  send() {
    const gameName = this.werwoelfleGame.game.name;
    const playerName = this.profileService.getCurrentIdentity().name;
    this.werwoelfleService.confirm(gameName, playerName).subscribe(value => {
    });
  }

  getWaitingConfirmText(): string {
    if (this.werwoelfleGame == null) {
      return "";
    }

    if (this.werwoelfleGame.playersThatNeedToConfirm.length > 0) {
      let str = "Wir warten noch auf: ";
      this.werwoelfleGame.playersThatNeedToConfirm.forEach(player => {
        str = str + player.identity.name + " ";
      });
      return str;
    } else {
      return "Alle haben bestätigt.";
    }
  }

}
