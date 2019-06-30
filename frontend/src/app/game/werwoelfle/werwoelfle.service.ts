import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ProfileService} from "../../shared/profile.service";
import {Observable} from "rxjs";
import {WerwoelfleGame, WerwoelfleRole} from "../../shared/model/werwoelfle-dtos";

@Injectable({
  providedIn: 'root'
})
export class WerwoelfleService {

  private backendUrl = "api/game/werwoelfle/";

  constructor(private httpClient: HttpClient,
              private profileService: ProfileService) {
  }

  public getRole(werwoelfleGame: WerwoelfleGame): WerwoelfleRole {
    const playerName = this.profileService.getCurrentIdentity().name;
    if (werwoelfleGame == null || werwoelfleGame.playerToWerwoelfleRoleMap == null) {
      return null;
    }

    return werwoelfleGame.playerToWerwoelfleRoleMap[playerName];
  }

  public getGame(gameName: string): Observable<WerwoelfleGame> {
    let url = `${this.backendUrl}?gameName=${gameName}`;
    return this.httpClient.get<WerwoelfleGame>(url);
  }

  confirm(gameName: string, playerName: string): Observable<HttpResponse<string>> {
    let url = `${this.backendUrl}confirm?gameName=${gameName}`;
    return this.httpClient.post<HttpResponse<string>>(url, playerName);
  }

  vote(gameName: string, fromName: string, toName: string): Observable<HttpResponse<string>>  {
    let url = `${this.backendUrl}vote?gameName=${gameName}&fromName=${fromName}`;
    return this.httpClient.post<HttpResponse<string>>(url, toName);
  }
}
