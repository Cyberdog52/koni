import {Component, Input, OnInit} from '@angular/core';
import {WerwoelfleGame, WerwoelfleRole} from "../../../shared/model/werwoelfle-dtos";
import {WerwoelfleService} from "../werwoelfle.service";

@Component({
  selector: 'werwoelfle-role',
  templateUrl: './werwoelfle-role.component.html',
  styleUrls: ['./werwoelfle-role.component.scss']
})
export class WerwoelfleRoleComponent implements OnInit {

  @Input() werwoelfleGame : WerwoelfleGame;

  constructor(private werwoelfleService: WerwoelfleService) { }

  ngOnInit() {
  }

  getRoleTitle() {
    const role = this.werwoelfleService.getRole(this.werwoelfleGame);
    switch (role) {
      case WerwoelfleRole.WEREWOLF: {
        return "Werwolf"
      }
      case WerwoelfleRole.CITIZEN: {
        return "Bürger"
      }
      case WerwoelfleRole.SEER: {
        return "Seherin"
      }

    }
  }

  getRoleSubtitle() {
    const role = this.werwoelfleService.getRole(this.werwoelfleGame);
    switch (role) {
      case WerwoelfleRole.WEREWOLF: {
        return "Du spielst gegen die Bürger. Behalte deine Identität geheim!"
      }
      case WerwoelfleRole.CITIZEN: {
        return "Du bist ein normaler Teil der Dorfgemeinschaft."
      }
      case WerwoelfleRole.SEER: {
        return "Du hilfst den Bürgern. Behalte deine Identität geheim!"
      }

    }
  }

  getImageURL() {
    const role = this.werwoelfleService.getRole(this.werwoelfleGame);
    switch (role) {
      case WerwoelfleRole.WEREWOLF: {
        return "../../../assets/werwoerter/werewolf.png"
      }
      case WerwoelfleRole.CITIZEN: {
        return "../../../assets/werwoerter/villager.png"
      }
      case WerwoelfleRole.SEER: {
        return "../../../assets/werwoerter/seer.png"
      }

    }
  }

  getRoleExplanation() {
    const role = this.werwoelfleService.getRole(this.werwoelfleGame);
    switch (role) {
      case WerwoelfleRole.WEREWOLF: {
        return "Du bist böse. " +
          "Töte alle Dorfbewohner und behalte deine Identität geheim!"
      }
      case WerwoelfleRole.CITIZEN: {
        return "Du bist ein normaler Bürger. " +
          "Versuche die Werwöfle bei Dorfabstimmungen zu töten! "
      }
      case WerwoelfleRole.SEER: {
        return "Du bist Seherin und darfst pro Nacht eine Identität herausfinden." +
          "Behalte deine Identität geheim, ansonsten wirst du schnell Opfer der Werwölfle. "
      }
    }
  }
}
