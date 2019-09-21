import {Component, Input, OnInit} from '@angular/core';
import {LeiterliGame, LeiterliHistoryBlock} from "../../../shared/model/leiterli-dtos";
import {ProfileService} from "../../../shared/profile.service";
import {Player} from "../../../shared/model/dtos";
import {LeiterliService} from "../leiterli.service";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {ToastrService} from "ngx-toastr";

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

  public getPlayerName(): string {
    return this.profileService.getCurrentIdentity().name;
  }

  ngOnInit() {
  }

  hasToRoll(): boolean {
    if (this.leiterliGame == null) return false;
    if (this.getPlayerName() == null) return false;
    return this.leiterliGame.playersThatNeedToRoll.filter(player => {
      return player.identity.name.localeCompare(this.getPlayerName()) == 0;
    }).length > 0;
  }

  getDiceRollHistory(): LeiterliHistoryBlock {
    if (this.leiterliGame == null) return null;
    const thisPlayersDiceRolls = this.leiterliGame.history.filter(h => {
      return h.player.identity.name.localeCompare(this.getPlayerName()) == 0;
    });
    return thisPlayersDiceRolls[thisPlayersDiceRolls.length-1];
  }

  roll(): void {
    this.leiterliService.roll(this.leiterliGame.game.name, this.getPlayerName()).subscribe(next=> {
      this.leiterliService.getGame(this.leiterliGame.game.name).subscribe(result => {

        this.leiterliService.animate(this.getDiceRollHistory())
      });
    });
  }

  getWaitingPlayerText(): string {
    let text = "Waiting for players: ";
    if (this.leiterliGame == null) {
      return "";
    }
    this.leiterliGame.playersThatNeedToRoll.forEach( player => {
      text = text + player.identity.name + " "
    });
    return text;
  }
}
