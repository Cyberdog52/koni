import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {ProfileService} from "../../shared/profile.service";
import {Observable} from "rxjs";
import {Game, Player} from "../../shared/model/dtos";
import {WerwoerterGame, WerwoerterMarker, WerwoerterRole} from "../../shared/model/werwoerter-dtos";

@Injectable({
  providedIn: 'root'
})
export class WerwoerterService {

  private backendUrl = "api/game/werwoerter/";

  constructor(private httpClient: HttpClient,
              private profileService: ProfileService) {
  }

  public getRole(werwoerterGame: WerwoerterGame): WerwoerterRole {
    const playerName = this.profileService.getCurrentIdentity().name;
    if (werwoerterGame == null || werwoerterGame.playerToWerwoerterRoleMap == null) {
      return null;
    }

    return werwoerterGame.playerToWerwoerterRoleMap[playerName];
  }

  public getGame(gameName: string): Observable<WerwoerterGame> {
    let url = `${this.backendUrl}?gameName=${gameName}`;
    return this.httpClient.get<WerwoerterGame>(url);
  }

  confirm(gameName: string, playerName: string): Observable<HttpResponse<string>> {
    let url = `${this.backendUrl}confirm?gameName=${gameName}`;
    return this.httpClient.post<HttpResponse<string>>(url, playerName);
  }

  addMarker(gameName: string, marker: WerwoerterMarker) {
    let url = `${this.backendUrl}marker?gameName=${gameName}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<HttpResponse<string>>(url, marker, {headers: headers});
  }

  sendGuessPlayer(gameName: string, votingPlayerName: string, selectedPlayerName: string): Observable<HttpResponse<string>>  {
    let url = `${this.backendUrl}guessPlayer?gameName=${gameName}&playerName=${votingPlayerName}`;
    return this.httpClient.post<HttpResponse<string>>(url, selectedPlayerName);
  }
}
