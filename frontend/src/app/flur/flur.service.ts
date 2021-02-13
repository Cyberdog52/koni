import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Observation} from "../shared/model/flur-dtos";

@Injectable({
  providedIn: 'root'
})
export class FlurService {

  private backendUrl = `api/flur`;
  constructor(private httpClient: HttpClient) {
  }

  public getLevel(stationId: number) : Observable<Observation[]> {
    let url = `${this.backendUrl}/level`;
    return this.httpClient.get<Observation[]>(url);
  }

  public getDischarge(stationId: number) : Observable<Observation[]> {
    let url = `${this.backendUrl}/discharge`;
    return this.httpClient.get<Observation[]>(url);
  }

  public getTemperature(stationId: number) : Observable<Observation[]> {
    let url = `${this.backendUrl}/temperature`;
    return this.httpClient.get<Observation[]>(url);
  }
}
