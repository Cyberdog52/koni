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
        path: "../../../../assets/leiterli/profiles/" + avatarName + ".PNG",
        alreadyPicked: this.isAlreadyPicked(avatarName)
      };
      avatarOptions.push(avatarOption);
    });

    this.avatarOptions = avatarOptions;
  }

  public getPlayerName(): string {
    return this.profileService.getCurrentIdentity().name;
  }

  pickAvatar() {
  this.leiterliService.avatar(this.leiterliGame.game.name, this.getPlayerName(), this.pickedAvatar).subscribe( response => {
    console.log("saved avatar");
  });
  }
}
