import {Component, Input, OnInit} from '@angular/core';
import {LeiterliField, LeiterliGame} from "../../../shared/model/leiterli-dtos";
import {Player} from "../../../shared/model/dtos";

@Component({
  selector: 'leiterli-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  constructor() { }

  @Input() leiterliField : LeiterliField;
  @Input() players : Player[];
  @Input() leiterliGame : LeiterliGame;

  ngOnInit() {
  }

  getImageForPlayer(playerName: string): string {
    if (this.leiterliGame == null) return "";
    const avatar =  this.leiterliGame.playerToAvatarMap[playerName];
    return "../../../../assets/leiterli/profiles/" + avatar + ".PNG"
  }

  getFieldType(): string {
    if (this.leiterliField == null) return "";
    const move = this.leiterliField.move;

    if (move == 0) {
      return "normal"
    }
    if (move > 20) {
      return "blue_good"
    }
    if (move > 10) {
      return "red_good"
    }
    if (move > 0) {
      return "green_good"
    }
    if (move < -20) {
      return "blue_bad"
    }
    if (move < -10) {
      return "red_bad"
    }
    if (move < 0) {
      return "green_bad"
    }
  }
}
