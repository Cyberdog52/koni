import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HousePointHistory, HousePointResponse} from "../shared/model/housepoints-dtos";

@Injectable({
  providedIn: 'root'
})
export class HousePointsService {

  private backendUrl = `api/housePoints`;
  constructor(private httpClient: HttpClient) {
  }

  public getHousePoints() : Observable<HousePointResponse> {
    let url = `${this.backendUrl}/summary`;
    return this.httpClient.get<HousePointResponse>(url);
  }

  public getHistory() : Observable<HousePointHistory[]> {
    let url = `${this.backendUrl}/history`;
    return this.httpClient.get<HousePointHistory[]>(url);
  }

  public updateHistory( newHistory: HousePointHistory) : Observable<HousePointHistory[]> {
    let url = `${this.backendUrl}/history`;
    return this.httpClient.post<HousePointHistory[]>(url, newHistory);
  }

}
