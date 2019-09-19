import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ProfileService} from "../../shared/profile.service";
import {Observable, Subject} from "rxjs";
import {LeiterliGame, LeiterliHistoryBlock} from "../../shared/model/leiterli-dtos";
import {Profile} from "../../shared/model/dtos";

@Injectable({
  providedIn: 'root'
})
export class LeiterliService {

  private backendUrl = "api/game/leiterli/";
  private _animateHistoryBlock$: Subject<LeiterliHistoryBlock> = new Subject();

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

  animate(diceRollHistory: LeiterliHistoryBlock): void {
    this._animateHistoryBlock$.next(diceRollHistory);
  }

  subscribeToAnimation(): Observable<LeiterliHistoryBlock> {
    return this._animateHistoryBlock$.asObservable()
  }
}
