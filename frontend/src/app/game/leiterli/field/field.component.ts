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
}
