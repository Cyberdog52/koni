import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LeiterliGame} from "../../../shared/model/leiterli-dtos";
import {LeiterliService} from "../leiterli.service";
import {ProfileService} from "../../../shared/profile.service";

export interface AvatarOption {
  title: string,
  path: string,
  alreadyPicked: boolean
}

@Component({
  selector: 'leiterli-avatarpicker',
  templateUrl: './avatarpicker.component.html',
  styleUrls: ['./avatarpicker.component.scss']
})
export class AvatarpickerComponent implements OnInit, OnChanges {

  @Input() leiterliGame: LeiterliGame;
  pickedAvatar: string;
  avatarOptions: AvatarOption[] = [];

  public static sourceForAvatarName(avatarName: string): string {
    const avatarToSourceMap:Map<string, string> =
      new Map([
        ["Bowser", "Bowser.PNG"],
        ["Buechi", "buechi.jpg"],
        ["Dani", "dani.jpg"],
        ["Donkey Kong", "DK.PNG"],
        ["Dome", "dome.jpg"],
        ["Engel", "engel.jpg"],
        ["Koni", "koni.jpg"],
        ["Luigi", "Luigi.PNG"],
        ["Mario", "Mario.PNG"],
        ["Peach", "Peach.PNG"],
        ["Toad", "Toad.PNG"],
        ["Wario", "Wario.PNG"],
        ["Yoshi", "Yoshi.PNG"],
        ["Agumon", "Agumon.png"],
        ["Candy Kong", "CandyKong.jpg"],
        ["Cranky Kong", "CrankyKong.jpg"],
        ["Daisy", "Daisy.png"],
        ["Diddy Kong", "DiddyKong.png"],
        ["Dixie Kong", "DixieKong.png"],
        ["Falcon", "Falcon.png"],
        ["Fox", "Fox.png"],
        ["Funky Kong", "FunkyKong.png"],
        ["Kiddy Kong", "KiddyKong.jpg"],
        ["Kirby", "Kirby.png"],
        ["Lanky Kong", "LankyKong.jpg"],
        ["Link", "Link.png"],
        ["Mewtwo", "Mewtwo.png"],
        ["Pikachu", "Pikachu.png"],
        ["Rabbid", "Rabbid.png"],
        ["Rayman", "Rayman.png"],
        ["Rosalina", "Rosalina.png"],
        ["Snake", "Snake.png"],
        ["Sonic", "Sonic.png"],
        ["Tiny Kong", "TinyKong.png"],
        ["Waluigi", "Waluigi.png"],
        ["Wrinkly Kong", "WrinklyKong.jpg"]
      ]);

    return "../../../../assets/leiterli/profiles/" + avatarToSourceMap.get(avatarName);
  }



  constructor(private leiterliService: LeiterliService,
              private profileService: ProfileService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setAvatarOptions();
  }

  isAlreadyPicked(avatarName: string) : boolean {
    let alreadyPicked = false;
    if (this.leiterliGame == null) return alreadyPicked;
    const ptaMap = this.leiterliGame.playerToAvatarMap;
    const values = Object.keys(ptaMap).map(function(key) {
      return ptaMap[key];
    });
    for (const value of values) {
      if (value.localeCompare(avatarName) == 0) {
        alreadyPicked = true;
      }
    }
    return true;
  }

  setAvatarOptions(): void {
    let avatarOptions: AvatarOption[] = [];
    if (this.leiterliGame == null) return;
    this.leiterliGame.avatarNames.forEach( avatarName => {

      const avatarOption = {
        title: avatarName,
        path: this.getPathForAvatarName(avatarName),
        alreadyPicked: this.isAlreadyPicked(avatarName)
      };
      avatarOptions.push(avatarOption);
    });

    this.avatarOptions = avatarOptions;
  }

  public getPlayerName(): string {
    return this.profileService.getCurrentIdentity().name;
  }

  getPathForAvatarName(avatarName: string): string {
    return AvatarpickerComponent.sourceForAvatarName(avatarName);
  }

  pickAvatar() {
  this.leiterliService.avatar(this.leiterliGame.game.name, this.getPlayerName(), this.pickedAvatar).subscribe( response => {
    console.log("saved avatar");
  });
  }
}
