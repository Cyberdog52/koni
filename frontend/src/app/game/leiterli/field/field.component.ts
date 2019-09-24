import {Component, Input, OnInit} from '@angular/core';
import {LeiterliField, LeiterliGame, LeiterliHistoryBlock} from "../../../shared/model/leiterli-dtos";
import {Player} from "../../../shared/model/dtos";
import {LeiterliHeadIcon} from "../board/board.component";
import {ProfileService} from "../../../shared/profile.service";
import {LeiterliService} from "../leiterli.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'leiterli-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  constructor(private profileService: ProfileService,
              private leiterliService: LeiterliService,
              private toastrService: ToastrService) {
  }

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
    if (this.leiterliField.number == 100) {
      return "../../../../assets/leiterli/fields/Star_door.png"
    }
    return FieldComponent.itemImage(this.leiterliField.move,this.leiterliField.visited)
  }

  public static itemImage(move: number, visited: boolean) {
    if (move == 0) {
      return "../../../../assets/leiterli/fields/Coin.png"
    }
    if (move == 100) {
      return "../../../../assets/leiterli/fields/Star.png"
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
      if (this.isAnimated(playerName)) {
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

  public getPlayerName(): string {
    return this.profileService.getCurrentIdentity().name;
  }

  isAnimated(playerName: string): boolean {
    return this.animationPlayerToHeadIcon[playerName] != null && this.animationPlayerToHeadIcon[playerName] != LeiterliHeadIcon.None;
  }

  hasToRoll(): boolean {
    if (this.leiterliGame == null) return false;
    if (this.getPlayerName() == null) return false;
    return this.leiterliGame.playersThatNeedToRoll.filter(player => {
      return player.identity.name.localeCompare(this.getPlayerName()) == 0;
    }).length > 0;
  }

  getDiceRollHistory(): LeiterliHistoryBlock {
    if (this.leiterliGame == null) return null;
    const thisPlayersDiceRolls = this.leiterliGame.history.filter(h => {
      return h.player.identity.name.localeCompare(this.getPlayerName()) == 0;
    });
    return thisPlayersDiceRolls[thisPlayersDiceRolls.length-1];
  }

  wantsToRollOnCorrectField(): boolean {
    let playerEqualstoLoggedInPlayer = false;
    this.players.forEach(player => {
      console.log(player);
      if (player.identity.name.localeCompare(this.getPlayerName())==0 ) {
        playerEqualstoLoggedInPlayer = true;
      }
    });
    return playerEqualstoLoggedInPlayer;
  }

  tryToRoll(): void {
    if (!this.wantsToRollOnCorrectField()) {
      return;
    }
    if (this.isAnimated(this.getPlayerName())) {
      this.toastrService.info("Warten", "Warte, bis deine Figur fertig gefahren ist, bevor du wieder Würfeln willst.");
      return;
    }
    if (!this.hasToRoll()) {
      this.toastrService.info(this.getWaitingPlayerText(), "Warten");
      return;
    }
    this.leiterliService.roll(this.leiterliGame.game.name, this.getPlayerName()).subscribe(next=> {
      console.log("rolled");
    });
  }

  getWaitingPlayerText(): string {
    let text = "Warten auf ";
    if (this.leiterliGame == null) {
      return "";
    }
    this.leiterliGame.playersThatNeedToRoll.forEach( player => {
      text = text + player.identity.name + " "
    });
    return text;
  }
}
