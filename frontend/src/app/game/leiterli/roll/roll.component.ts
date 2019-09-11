import {Component, Input, OnInit} from '@angular/core';
import {LeiterliGame} from "../../../shared/model/leiterli-dtos";
import {ProfileService} from "../../../shared/profile.service";
import {Player} from "../../../shared/model/dtos";
import {LeiterliService} from "../leiterli.service";

@Component({
  selector: 'leiterli-roll',
  templateUrl: './roll.component.html',
  styleUrls: ['./roll.component.scss']
})
export class RollComponent implements OnInit {

  @Input() leiterliGame: LeiterliGame;

  constructor(private profileService: ProfileService,
              private leiterliService: LeiterliService) {
  }

  public getPlayer(): Player {
    const playerName = this.profileService.getCurrentIdentity().name;
    if (this.leiterliGame == null) {
      return null;
    }
    return this.leiterliGame.game.players.copyWithin(0, 0).filter(player => {
      return player.identity.name.localeCompare(playerName) == 0
    }).pop();
  }

  ngOnInit() {
  }

  hasToRoll(): boolean {
    if (this.leiterliGame == null) return false;
    if (this.getPlayer() == null) return false;
    return this.leiterliGame.playersThatNeedToRoll.filter(player => {
      return player.identity.name.localeCompare(this.getPlayer().identity.name) == 0;
    }).length > 0;
  }

  roll(): void {
    this.leiterliService.roll(this.leiterliGame.game.name, this.getPlayer().identity.name).subscribe(next=> {
      console.log("Rolled");
    });
  }

}
