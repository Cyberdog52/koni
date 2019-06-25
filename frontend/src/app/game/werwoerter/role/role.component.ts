import {Component, Input, OnInit} from '@angular/core';
import {WerwoerterGame, WerwoerterRole} from "../../../shared/model/werwoerter-dtos";
import {ProfileService} from "../../../shared/profile.service";
import {WerwoerterService} from "../werwoerter.service";

@Component({
  selector: 'role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  @Input() werwoerterGame : WerwoerterGame;

  constructor(private werwoerterService: WerwoerterService) { }

  ngOnInit() {
  }

  getRoleTitle() {
    const role = this.werwoerterService.getRole(this.werwoerterGame);
    switch (role) {
      case WerwoerterRole.WEREWOLF: {
        return "Werwolf"
      }
      case WerwoerterRole.CITIZEN: {
        return "Bürger"
      }
      case WerwoerterRole.SEER: {
        return "Seherin"
      }

    }
  }

  getRoleSubtitle() {
    const role = this.werwoerterService.getRole(this.werwoerterGame);
    switch (role) {
      case WerwoerterRole.WEREWOLF: {
        return "Du spielst gegen die Bürger. Behalte deine Identität geheim!"
      }
      case WerwoerterRole.CITIZEN: {
        return "Du bist ein normaler Teil der Dorfgemeinschaft."
      }
      case WerwoerterRole.SEER: {
        return "Du hilfst den Bürgern. Behalte deine Identität geheim!"
      }

    }
  }

  getImageURL() {
    const role = this.werwoerterService.getRole(this.werwoerterGame);
    switch (role) {
      case WerwoerterRole.WEREWOLF: {
        return "../../../assets/werwoerter/werewolf.png"
      }
      case WerwoerterRole.CITIZEN: {
        return "../../../assets/werwoerter/villager.png"
      }
      case WerwoerterRole.SEER: {
        return "../../../assets/werwoerter/seer.png"
      }

    }
  }

  getRoleExplanation() {
    const role = this.werwoerterService.getRole(this.werwoerterGame);
    switch (role) {
      case WerwoerterRole.WEREWOLF: {
        return "Als Werwolf weisst du das geheime Wort. " +
          "Versuche dem Bürgermeister fragen zu stellen, welche die Bürger auf eine falsche Fährte lockt. " +
          "Zusätzlich hast du die Aufgabe die Seherin zu entdecken, welche das geheime Wort auch weiss. \n" +
          "Verhalte dich aber nicht zu auffällig. " +
          "Falls die Bürger das Wort nicht herausfinden, können sie dich enttarnen und du hast somit trotzdem verloren. "
      }
      case WerwoerterRole.CITIZEN: {
        return "Versuche das geheime Wort herauszufinden, indem du dem Bürgermeister Fragen stellst. \n" +
          "Die Seherin versucht dir zu helfen. " +
          "Werwölfe versuchen dich auf eine falsche Fährte zu locken. " +
          "Falls du und deine Mitbürger das Wort nicht erraten könnt, dürft ihr versuchen einen Werwolf zu entarnen, um doch noch zu gewinnen. "
      }
      case WerwoerterRole.SEER: {
        return "Als Seherin kennst du das geheime Wort. " +
          "Versuche den Bürgern beim Erraten des Wortes zu helfen. " +
          "Hilf ihnen aber nicht zu auffällig. \n" +
          "Falls die Bürger das Wort herausfinden und du von den Werwölfen enttarnt wirst, verlierst du und die Dorfgemeinschaft trotzdem. "
      }

    }
  }
}
