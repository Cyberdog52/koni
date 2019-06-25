import {Component, Input, OnInit} from '@angular/core';
import {WerwoerterGame, WerwoerterRole} from "../../../shared/model/werwoerter-dtos";
import {WerwoerterService} from "../werwoerter.service";

@Component({
  selector: 'read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent implements OnInit {

  @Input() werwoerterGame : WerwoerterGame;

  constructor(private werwoerterService: WerwoerterService) { }

  ngOnInit() {
  }

  isAllowedToRead(): boolean {
    const role = this.werwoerterService.getRole(this.werwoerterGame);
    if (role == null) {
      return false;
    }
    if (role == WerwoerterRole.SEER || role == WerwoerterRole.WEREWOLF) {
      return true;
    }

    return false;
  }

  getText(): string {
    if (this.isAllowedToRead()) {
      return `Das geheime Wort ist ${this.werwoerterGame.word}.`
    } else {
      return "Du hast keine Rolle, die das geheime Wort sehen darf. " +
        "Nur Werwölfe, die Seherin und der Bürgermeister dürfen das Wort sehen. " +
        "Versuche das geheime Wort herauszufinden, in dem du dem Bürgermeister Fragen stellst. "
    }
  }

}
