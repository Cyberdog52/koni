import {Component, Input, OnInit} from '@angular/core';
import {LeiterliField, LeiterliGame} from "../../../shared/model/leiterli-dtos";
import {Player} from "../../../shared/model/dtos";
import {LeiterliHeadIcon} from "../board/board.component";

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
  @Input() animationPlayerToHeadIcon : Map<string, LeiterliHeadIcon>;

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

  getItemImage() {
    return FieldComponent.itemImage(this.leiterliField.move,this.leiterliField.visited)
  }

  public static itemImage(move: number, visited: boolean) {
    if (move == 0) {
      return "../../../../assets/leiterli/fields/Coin.png"
    }
    if (move > 20) {
      return "../../../../assets/leiterli/fields/Golden_mushroom.png"
    }
    if (move > 10) {
      return "../../../../assets/leiterli/fields/Red_mushroom.png"
    }
    if (move > 0) {
      return "../../../../assets/leiterli/fields/Green_mushroom.png"
    }
    if (move < -20) {
      return "../../../../assets/leiterli/fields/Blue_shell.png"
    }
    if (move < -10) {
      return "../../../../assets/leiterli/fields/Red_shell.png"
    }
    if (move < 0) {
      return "../../../../assets/leiterli/fields/Green_shell.png"
    }
  }

  hasHeadIcon() : boolean {
    console.log("Headicons: ", this.getHeadIcons());
    return this.getHeadIcons().length > 0;
  }

  static headIconToImageSrc(icon: LeiterliHeadIcon): string {
    switch(icon) {
      case LeiterliHeadIcon.None: return "../../../../assets/leiterli/fields/Coin.png";
      case LeiterliHeadIcon.Green_Shell: return "../../../../assets/leiterli/fields/Green_shell.png";
      case LeiterliHeadIcon.Red_Shell: return "../../../../assets/leiterli/fields/Red_shell.png";
      case LeiterliHeadIcon.Blue_Shell: return "../../../../assets/leiterli/fields/Blue_shell.png";
      case LeiterliHeadIcon.Green_Mushroom: return "../../../../assets/leiterli/fields/Green_mushroom.png";
      case LeiterliHeadIcon.Red_Mushroom: return "../../../../assets/leiterli/fields/Red_mushroom.png";
      case LeiterliHeadIcon.Golden_Mushroom: return "../../../../assets/leiterli/fields/Golden_mushroom.png";
      case LeiterliHeadIcon.Dice1: return "../../../../assets/leiterli/dice/1.png";
      case LeiterliHeadIcon.Dice2: return "../../../../assets/leiterli/dice/2.png";
      case LeiterliHeadIcon.Dice3: return "../../../../assets/leiterli/dice/3.png";
      case LeiterliHeadIcon.Dice4: return "../../../../assets/leiterli/dice/4.png";
      case LeiterliHeadIcon.Dice5: return "../../../../assets/leiterli/dice/5.png";
      case LeiterliHeadIcon.Dice6: return "../../../../assets/leiterli/dice/6.png";
    }
  }

  private getHeadIcons(): LeiterliHeadIcon[] {
    let icons = [];
    if (this.players == null) {
      return icons;
    }
    this.players.forEach(player => {
      const playerName = player.identity.name;
      if (this.animationPlayerToHeadIcon[playerName] != null && this.animationPlayerToHeadIcon[playerName] != LeiterliHeadIcon.None) {
        icons.push(this.animationPlayerToHeadIcon[playerName]);
      }
    });
    return icons;
  }

  getHeadIconImage(): string {
    if (this.getHeadIcons().length == 0) {
      return ""
    }
    return FieldComponent.headIconToImageSrc(this.getHeadIcons()[0])
  }
}
