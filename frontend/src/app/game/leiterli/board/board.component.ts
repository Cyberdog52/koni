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

  static getLeiterliHeadIconForRoll(roll: number): LeiterliHeadIcon {
    switch (roll) {
      case 1: return LeiterliHeadIcon.Dice1;
      case 2: return LeiterliHeadIcon.Dice2;
      case 3: return LeiterliHeadIcon.Dice3;
      case 4: return LeiterliHeadIcon.Dice4;
      case 5: return LeiterliHeadIcon.Dice5;
      case 6: return LeiterliHeadIcon.Dice6;
      default: return LeiterliHeadIcon.None;
    }
  }

  static getLeiterliHeadIconForMove(move: number): LeiterliHeadIcon {
    if (move == 0) {
      return LeiterliHeadIcon.None;
    }
    if (move > 20) {
      return LeiterliHeadIcon.Golden_Mushroom;
    }
    if (move > 10) {
      return LeiterliHeadIcon.Red_Mushroom;
    }
    if (move > 0) {
      return LeiterliHeadIcon.Green_Mushroom;
    }
    if (move < -20) {
      return LeiterliHeadIcon.Blue_Shell;
    }
    if (move < -10) {
      return LeiterliHeadIcon.Red_Shell;
    }
    if (move < 0) {
      return LeiterliHeadIcon.Green_Shell;
    }
  }


  static async playAudio(source: string){
    let audio = new Audio();
    audio.src = source;
    audio.load();
    audio.play();
  }

  getSoundSource(move: number) : string{
    if (move == 0) {
      return "../../../../assets/leiterli/sounds/Coin.mp3";
    }
    if (move > 20) {
      return "../../../../assets/leiterli/sounds/Star.mp3";
    }
    if (move > 10) {
      return "../../../../assets/leiterli/sounds/Mushroom.mp3";
    }
    if (move > 0) {
      return "../../../../assets/leiterli/sounds/Mushroom.mp3";
    }
    if (move < -20) {
      return "../../../../assets/leiterli/sounds/MammaMia2.wav";
    }
    if (move < -10) {
      return "../../../../assets/leiterli/sounds/MammaMia.wav";
    }
    if (move < 0) {
      return "../../../../assets/leiterli/sounds/MammaMia.wav";
    }
  }

  async prepareAnimation() {
    this.leiterliService.subscribeToAnimation().subscribe(async diceRollHistory => {
      const playerName = diceRollHistory.player.name;
      const temporaryTarget = Math.min(100, diceRollHistory.previousField + diceRollHistory.roll);

      this.animationPlayerToHeadIconMap[playerName] = BoardComponent.getLeiterliHeadIconForRoll(diceRollHistory.roll);
      for(var counter:number = diceRollHistory.previousField; counter<=temporaryTarget; counter++){
        this.animationPlayerToNumberMap[playerName] = counter;
        await this.delay(this.maxAnimationTimeInMs);
      }

      let delayForSpecialAnimation = this.targetAnimationTimeInMs / Math.abs(BoardComponent.getMoveDifference(diceRollHistory));
      delayForSpecialAnimation = Math.max(delayForSpecialAnimation, this.minAnimationTimeInMs);
      delayForSpecialAnimation = Math.min(delayForSpecialAnimation, this.maxAnimationTimeInMs);

      if (BoardComponent.getMoveDifference(diceRollHistory) != 0) {
        this.animationPlayerToHeadIconMap[playerName] = BoardComponent.getLeiterliHeadIconForMove(BoardComponent.getMoveDifference(diceRollHistory));
        await this.delay(500);
      }

      if (diceRollHistory.currentField == 100) {
        BoardComponent.playAudio("../../../../assets/leiterli/sounds/Clear.mp3");
      } else {
        BoardComponent.playAudio(this.getSoundSource(BoardComponent.getMoveDifference(diceRollHistory)));

      }

      if (BoardComponent.getMoveDifference(diceRollHistory) > 0) {
        for(let counter:number = temporaryTarget; counter<diceRollHistory.currentField; counter++){
          this.animationPlayerToNumberMap[playerName] = counter;
          await this.delay(delayForSpecialAnimation);
        }
      }

      if (BoardComponent.getMoveDifference(diceRollHistory) < 0) {
        for(let counter:number = temporaryTarget; counter>diceRollHistory.currentField; counter--){
          this.animationPlayerToNumberMap[playerName] = counter;
          await this.delay(delayForSpecialAnimation);
        }
      }

      this.animationPlayerToNumberMap[playerName] = -1;
      this.animationPlayerToHeadIconMap[playerName] = LeiterliHeadIcon.None;
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
      if (this.isAnimated(player.name) && this.animationPlayerToNumberMap[player.name] == field.number) {
        players.push(player);
      } else {
        if (this.leiterliGame.playerToNumberMap[player.name] == field.number && !this.isAnimated(player.name)) {
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
