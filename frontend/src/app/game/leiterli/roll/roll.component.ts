import {Component, Input, OnInit} from '@angular/core';
import {LeiterliGame} from "../../../shared/model/leiterli-dtos";
import {ProfileService} from "../../../shared/profile.service";
import {Player} from "../../../shared/model/dtos";
import {LeiterliService} from "../leiterli.service";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {RollresultComponent} from "../rollresult/rollresult.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'leiterli-roll',
  templateUrl: './roll.component.html',
  styleUrls: ['./roll.component.scss']
})
export class RollComponent implements OnInit {

  @Input() leiterliGame: LeiterliGame;

  constructor(private profileService: ProfileService,
              private leiterliService: LeiterliService,
              private toastrService: ToastrService,
              public rollResultDialog: MatDialog) {
  }

  public getPlayerName(): string {
    return this.profileService.getCurrentIdentity().name;
  }

  openDialog(leiterliGame: LeiterliGame) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = leiterliGame;
    const dialogRef = this.rollResultDialog.open(RollresultComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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

  roll(): void {
    this.leiterliService.roll(this.leiterliGame.game.name, this.getPlayerName()).subscribe(next=> {
      this.leiterliService.getGame(this.leiterliGame.game.name).subscribe(result => {
        //TODO toastrService.
        this.openDialog(result);
      });
    });
  }

}
