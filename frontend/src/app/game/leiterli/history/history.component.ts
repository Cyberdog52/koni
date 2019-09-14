import {Component, Input, OnInit} from '@angular/core';
import {LeiterliGame, LeiterliHistoryBlock} from "../../../shared/model/leiterli-dtos";

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
    return this.leiterliGame.history.reverse();
  }

  getDiceIcon(dice: number): string {
    switch (dice) {
      case 1: return "looks_one";
      case 2: return "looks_two";
      default: return "looks_" + dice.toString();
    }

  }

}
