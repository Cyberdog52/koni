import {Component, Input, OnInit} from '@angular/core';
import {LeiterliGame} from "../../../shared/model/leiterli-dtos";
import {map} from "rxjs/operators";
import {AvatarpickerComponent} from "../avatarpicker/avatarpicker.component";

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

    const sortedRankedPlayers = rankedPlayers.sort((p1, p2) => {
      if (this.getNumberOfStars(p1.name) == this.getNumberOfStars(p2.name)) {
        return p2.field - p1.field;
      }
      return this.getNumberOfStars(p2.name) - this.getNumberOfStars(p1.name);
    });

    let rank = 1;
    sortedRankedPlayers.forEach( rankedPlayer => {
      rankedPlayer.rank = rank;
      rank = rank + 1;
    });

    return sortedRankedPlayers;
  }



  getImageForPlayer(playerName: string): string {
    if (this.leiterliGame == null) return "";
    const avatarName =  this.leiterliGame.playerToAvatarMap[playerName];
    return AvatarpickerComponent.sourceForAvatarName(avatarName);
  }

  hasStar(name: string): boolean {
    return this.getNumberOfStars(name) > 0;
  }

  getNumberOfStars(name: string): number {
    return this.leiterliGame.playerToStarsMap[name];
  }
}



