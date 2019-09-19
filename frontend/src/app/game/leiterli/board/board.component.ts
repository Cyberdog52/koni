import {Component, Input, OnInit} from '@angular/core';
import {WerwoelfleGame} from "../../../shared/model/werwoelfle-dtos";
import {LeiterliField, LeiterliGame, LeiterliHistoryBlock} from "../../../shared/model/leiterli-dtos";
import {Player} from "../../../shared/model/dtos";
import {LeiterliService} from "../leiterli.service";
import {ToastrService} from "ngx-toastr";

export interface Tile {
  cols: number;
  rows: number;
  text: string;
  leiterliField: LeiterliField;
}

export enum LeiterliHeadIcon {
  None,
  Dice1, Dice2, Dice3, Dice4, Dice5, Dice6,
  Red_Shell, Red_Mushroom,
  Green_Shell, Green_Mushroom,
  Blue_Shell, Golden_Mushroom
}

@Component({
  selector: 'leiterli-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(private leiterliService: LeiterliService,
              private toastrService: ToastrService) { }

  private animationPlayerToNumberMap : Map<string, number> = new Map();

  private animationPlayerToHeadIconMap : Map<string, LeiterliHeadIcon> = new Map();

  private targetAnimationTimeInMs = 5000;
  private minAnimationTimeInMs = 100;
  private maxAnimationTimeInMs = 500;

  ngOnInit() {
    this.prepareAnimation();
  }

  @Input() leiterliGame : LeiterliGame;

  getTiles() {
    let tiles = [];
    if (this.leiterliGame == null) {
      return tiles;
    }
    this.leiterliGame.board.fields.forEach(field => {
      tiles.push({text: field.number, cols: 1, rows: 1, leiterliField: field});
    });
    return tiles;
  }

  async prepareAnimation() {
    this.leiterliService.subscribeToAnimation().subscribe(async diceRollHistory => {
      const temporaryTarget = diceRollHistory.previousField + diceRollHistory.roll;
      for(var counter:number = diceRollHistory.previousField; counter<temporaryTarget; counter++){
        //this.toastrService.info(counter.toString(), "You are at: ");
        this.animationPlayerToNumberMap[diceRollHistory.player.identity.name] = counter;
        await this.delay(this.maxAnimationTimeInMs);
      }

      let delayForSpecialAnimation = this.targetAnimationTimeInMs / Math.abs(BoardComponent.getMoveDifference(diceRollHistory))
      delayForSpecialAnimation = Math.max(delayForSpecialAnimation, this.minAnimationTimeInMs);
      delayForSpecialAnimation = Math.min(delayForSpecialAnimation, this.maxAnimationTimeInMs);
      console.log("Delay: ", delayForSpecialAnimation);

      if (BoardComponent.getMoveDifference(diceRollHistory) > 0) {
        for(var counter:number = temporaryTarget; counter<diceRollHistory.currentField; counter++){
          //this.toastrService.info(counter.toString(), "You are at: ");
          this.animationPlayerToNumberMap[diceRollHistory.player.identity.name] = counter;
          await this.delay(delayForSpecialAnimation);
        }
      }

      if (BoardComponent.getMoveDifference(diceRollHistory) < 0) {
        for(var counter:number = temporaryTarget; counter>diceRollHistory.currentField; counter--){
          //this.toastrService.info(counter.toString(), "You are at: ");
          this.animationPlayerToNumberMap[diceRollHistory.player.identity.name] = counter;
          await this.delay(delayForSpecialAnimation);
        }
      }

      this.animationPlayerToNumberMap[diceRollHistory.player.identity.name] = -1;
    });
  }

  static getMoveDifference(history: LeiterliHistoryBlock): number {
    return history.currentField - history.previousField - history.roll;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  getPlayers(field: LeiterliField): Player[] {
    let players = [];
    if (this.leiterliGame.playerToNumberMap == undefined) {
      return players;
    }

    this.leiterliGame.game.players.forEach(player => {
      if (this.isAnimated(player.identity.name) && this.animationPlayerToNumberMap[player.identity.name] == field.number) {
        players.push(player);
      } else {
        if (this.leiterliGame.playerToNumberMap[player.identity.name] == field.number && !this.isAnimated(player.identity.name)) {
          players.push(player);
        }
      }
    });
    return players;
  }

  isAnimated(playerName: string): boolean {
    if (this.animationPlayerToNumberMap == null) return false;
    if (this.animationPlayerToNumberMap[playerName] == null) return false;
    return this.animationPlayerToNumberMap[playerName]>0;
  }
}
