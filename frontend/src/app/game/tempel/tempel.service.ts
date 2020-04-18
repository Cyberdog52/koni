import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ProfileService} from "../../shared/profile.service";
import {Observable} from "rxjs";
import {TempelGame, TempelRole} from "../../shared/model/tempel-dtos";

@Injectable({
  providedIn: 'root'
})
export class TempelGameService {

  private backendUrl = "api/game/tempel/";

  constructor(private httpClient: HttpClient,
              private profileService: ProfileService) {
  }

  public getRole(tempelGame: TempelGame): TempelRole {
    const playerName = this.profileService.getCurrentIdentity().name;
    if (tempelGame == null || tempelGame.playerToTempelRoleMap == null) {
      return null;
    }

    return tempelGame.playerToTempelRoleMap[playerName];
  }

  public getGame(gameName: string): Observable<TempelGame> {
    let url = `${this.backendUrl}?gameName=${gameName}`;
    return this.httpClient.get<TempelGame>(url);
  }

  open(gameName: string, cardNumber: number): Observable<HttpResponse<string>> {
    let url = `${this.backendUrl}open?gameName=${gameName}`;
    return this.httpClient.post<HttpResponse<string>>(url, cardNumber);
  }

  restart(gameName: string, playerName: string): Observable<HttpResponse<string>> {
    let url = `${this.backendUrl}restart?gameName=${gameName}`;
    return this.httpClient.post<HttpResponse<string>>(url, playerName);
  }
}
