import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Game, GameType, Profile} from "../shared/model/dtos";
import {ProfileService} from "../shared/profile.service";

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  private backendUrl = "api/game/";

  constructor(private httpClient: HttpClient, private profileService: ProfileService) {
  }

  public getGames(): Observable<Game[]> {
    return this.httpClient.get<Game[]>(this.backendUrl + '');
  }

  public createGame(name: string, gameType: GameType): Observable<Game> {
    let url = `${this.backendUrl}create?gameName=${name}&gameType=${gameType}`;
    return this.httpClient.post<Game>(url, this.profileService.getCurrentIdentity().name)
  }

  public joinGame(name: string): Observable<Game> {
    return this.httpClient.post<Game>(`${this.backendUrl}join?gameName=${name}`, this.profileService.getCurrentIdentity().name)
  }

  public startGame(game: Game): Observable<Game> {
    return this.httpClient.get<Game>(`${this.backendUrl}start?gameName=${game.name}`);
  }

  public leaveGame(name: string) {
    return this.httpClient.post<Game>(`${this.backendUrl}leave?gameName=${name}`, this.profileService.getCurrentIdentity().name)
  }

  public deleteGame(name: string) {
    return this.httpClient.post<Game>(`${this.backendUrl}delete?gameName=${name}`, this.profileService.getCurrentIdentity().name)
  }
}
