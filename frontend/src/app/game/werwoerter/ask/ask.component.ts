import {Component, Input, OnInit} from '@angular/core';
import {WerwoerterGame, WerwoerterMarker} from "../../../shared/model/werwoerter-dtos";
import {WerwoerterService} from "../werwoerter.service";
import {ProfileService} from "../../../shared/profile.service";

@Component({
  selector: 'ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.scss']
})
export class AskComponent implements OnInit {

  @Input() werwoerterGame : WerwoerterGame;
  wordFoundMarker = WerwoerterMarker.WORDFOUND;
  wordNotFoundMarker = WerwoerterMarker.WORDNOTFOUND;
  correctGuessMarker = WerwoerterMarker.CORRECTGUESS;
  wrongGuessMarker = WerwoerterMarker.WRONGGUESS;
  maybeGuessMarker = WerwoerterMarker.MAYBEGUESS;
  wrongTrackMarker = WerwoerterMarker.WRONGTRACK;
  closeMarker = WerwoerterMarker.CLOSE;

  maxQuestions : number = 35; //TODO make adjustable

  Arr = Array;

  constructor(private werwoerterService: WerwoerterService,
              private profileService: ProfileService) { }

  ngOnInit() {
  }

  isMayor() {
    const playerName = this.profileService.getCurrentIdentity().name;
    if (this.werwoerterGame == null || this.werwoerterGame.mayor == null) {
      return false;
    }
    return this.werwoerterGame.mayor.identity.name.localeCompare(playerName) == 0;
  }

  getMayorText(): string {
    if (this.werwoerterGame == null) {
      return "";
    }
    const secret = this.werwoerterGame.word;
    return "Du bist der Bürgermeister. " +
      "Beantworte alle Fragen mit den Buttons weiter unten." +
      "Das geheime Wort ist: " + secret + ". " +
      "Behalte dieses Wort geheim! " +
      "Falls das Wort gefunden wurde oder die maximale Anzahl von Fragen aufgebraucht wurde, gibt es dafür weiter unten noch zwei weitere Buttons."
  }

  getRestText(): string {
    return "Finde das geheime Wort heraus. " +
      "Falls du es schon weisst, versuch so zu tun, als ob du es noch nicht kennst. " +
      "Frage dem Bürgermeister Fragen, die er mit JA oder NEIN beantworten kann. "
  }

  sendMarker(marker: WerwoerterMarker) {
    this.werwoerterService.addMarker(this.werwoerterGame.game.name, marker).subscribe(response => {
      console.log("response markers: ", response);
    });
  }

  numberOfMarker(marker: WerwoerterMarker) {
    if (this.werwoerterGame == null) {
      return 0;
    }
    return this.werwoerterGame.markers.filter(loggedMarker => {
      return loggedMarker == marker
    }).length;
  }

  numberOfMarkers(): number {
    if (this.werwoerterGame == null) {
      return 0;
    }
    return this.werwoerterGame.markers.length;
  }

  canMayorAddMarkers(): boolean {
    if (this.werwoerterGame == null) {
      return true;
    }
    return this.maxQuestions > this.werwoerterGame.markers.length;
  }
}
