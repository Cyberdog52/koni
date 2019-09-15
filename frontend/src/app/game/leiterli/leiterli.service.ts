import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ProfileService} from "../../shared/profile.service";
import {Observable} from "rxjs";
import {LeiterliGame} from "../../shared/model/leiterli-dtos";

@Injectable({
  providedIn: 'root'
})
export class LeiterliService {

  private backendUrl = "api/game/leiterli/";

  constructor(private httpClient: HttpClient,
              private profileService: ProfileService) {
  }

  public getGame(gameName: string): Observable<LeiterliGame> {
    let url = `${this.backendUrl}?gameName=${gameName}`;
    return this.httpClient.get<LeiterliGame>(url);
  }

  roll(gameName: string, playerName: string): Observable<HttpResponse<string>> {
    let url = `${this.backendUrl}roll?gameName=${gameName}`;
    return this.httpClient.post<HttpResponse<string>>(url, playerName);
  }

  avatar(gameName: string, playerName: string, avatarName: string): Observable<HttpResponse<string>>  {
    let url = `${this.backendUrl}avatar?gameName=${gameName}&playerName=${playerName}`;
    return this.httpClient.post<HttpResponse<string>>(url, avatarName);
  }
}
