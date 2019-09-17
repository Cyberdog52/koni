import {Component, Inject, OnInit} from '@angular/core';
import {LeiterliGame, LeiterliHistoryBlock} from "../../../shared/model/leiterli-dtos";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProfileService} from "../../../shared/profile.service";
import {HistoryBlock} from "../../../shared/model/werwoelfle-dtos";

@Component({
  selector: 'app-rollresult',
  templateUrl: './rollresult.component.html',
  styleUrls: ['./rollresult.component.scss']
})
export class RollresultComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<RollresultComponent>,
              @Inject(MAT_DIALOG_DATA) public data: LeiterliGame,
              private profileService: ProfileService) {}

  ngOnInit() {
  }

  public getPlayerName(): string {
    return this.profileService.getCurrentIdentity().name;
  }

  close() {
    this.dialogRef.close();
  }

  getDiceRollHistory(): LeiterliHistoryBlock {
    if (this.data == null) return null;
    const thisPlayersDiceRolls = this.data.history.filter(h => {
      return h.player.identity.name.localeCompare(this.getPlayerName()) == 0;
    });
    return thisPlayersDiceRolls[thisPlayersDiceRolls.length-1];
  }

  getCurrentField(): number {
    if (this.getDiceRollHistory() == null) {
      return 0;
    }
    return this.getDiceRollHistory().currentField;
  }

  getPreviousField(): number {
    if (this.getDiceRollHistory() == null) {
      return 0;
    }
    return this.getDiceRollHistory().previousField;
  }

  getDiceRoll(): number {
    if (this.getDiceRollHistory() == null) {
      return 1;
    }
    return this.getDiceRollHistory().roll;
  }

  getMoveDifference(): number {
    if (this.getDiceRollHistory() == null) {
      return 0;
    }
    return this.getDiceRollHistory().currentField - this.getDiceRollHistory().previousField - this.getDiceRollHistory().roll;
  }

  getDiceImage() {
    return "../../../../assets/leiterli/dice/"+ this.getDiceRoll()+".png"
  }

  getTitle() {
     if (this.getMoveDifference() == 0) {
       return "Du hast eine " + this.getDiceRoll() + " gerollt.";
     }
    if (this.getMoveDifference() > 0) {
      return "Whuahuuuu!";
    }
    if (this.getMoveDifference() < 0) {
      return "Oh no, mamma mia...";
    }
  }
}
