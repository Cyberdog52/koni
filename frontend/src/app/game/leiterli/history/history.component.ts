import {Component, Input, OnInit} from '@angular/core';
import {LeiterliGame, LeiterliHistoryBlock} from "../../../shared/model/leiterli-dtos";
import {AvatarpickerComponent} from "../avatarpicker/avatarpicker.component";

@Component({
  selector: 'leiterli-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  @Input() leiterliGame: LeiterliGame;

  constructor() { }

  ngOnInit() {
  }

  getHistory(): LeiterliHistoryBlock[] {
    if (this.leiterliGame == null) {
      return null;
    }

    return this.leiterliGame.history.sort((block1, block2) => {
      return block2.id - block1.id;
    });
    return this.leiterliGame.history;
  }

  getDiceIcon(dice: number): string {
    switch (dice) {
      case 1: return "looks_one";
      case 2: return "looks_two";
      default: return "looks_" + dice.toString();
    }

  }

  getImageForPlayer(playerName: string): string {
    if (this.leiterliGame == null) return "";
    const avatarName =  this.leiterliGame.playerToAvatarMap[playerName];
    return AvatarpickerComponent.sourceForAvatarName(avatarName);
  }

}
