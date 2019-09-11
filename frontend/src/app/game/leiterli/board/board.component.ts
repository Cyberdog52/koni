import {Component, Input, OnInit} from '@angular/core';
import {WerwoelfleGame} from "../../../shared/model/werwoelfle-dtos";
import {LeiterliField, LeiterliGame} from "../../../shared/model/leiterli-dtos";
import {Player} from "../../../shared/model/dtos";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  leiterliField: LeiterliField;
}

@Component({
  selector: 'leiterli-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() leiterliGame : LeiterliGame;

  getTiles() {
    let tiles = [];
    if (this.leiterliGame == null) {
      return tiles;
    }
    this.leiterliGame.board.fields.forEach(field => {
      tiles.push({text: field.number, cols: 1, rows: 1, color: 'lightblue', leiterliField: field});
    });
    return tiles;
  }

  getPlayers(field: LeiterliField): Player[] {
    let players = [];
    if (this.leiterliGame.playerToNumberMap == undefined) {
      return players;
    }
    this.leiterliGame.game.players.forEach(player => {
      if (this.leiterliGame.playerToNumberMap[player.identity.name] == field.number) {
        players.push(player);
      }
    });
    return players;
  }
}
