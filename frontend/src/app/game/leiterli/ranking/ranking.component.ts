import {Component, Input, OnInit} from '@angular/core';
import {LeiterliGame} from "../../../shared/model/leiterli-dtos";
import {map} from "rxjs/operators";

export interface RankedPlayer{
  rank: number
  name: string
  field: number
}

@Component({
  selector: 'leiterli-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  @Input() leiterliGame: LeiterliGame;

  constructor() { }

  ngOnInit() {
  }


  getRankedPlayers() : RankedPlayer[] {
    if (this.leiterliGame == null) {
      return [];
    }
    let rankedPlayers = [];
    this.leiterliGame.game.players.forEach(player => {
      const playerName = player.identity.name;
      const field = this.leiterliGame.playerToNumberMap[playerName];
      const rankedPlayer = {
        rank: 0,
        name: playerName,
        field: field
      };
      rankedPlayers.push(rankedPlayer);
    });

    console.log(rankedPlayers);

    const sortedRankedPlayers = rankedPlayers.sort((p1, p2) => {
      return p1.field - p2.field;
    });

    let rank = 1;
    sortedRankedPlayers.forEach( rankedPlayer => {
      rankedPlayer.rank = rank;
      rank = rank + 1;
    });

    console.log(sortedRankedPlayers);

    return sortedRankedPlayers;
  }
}



