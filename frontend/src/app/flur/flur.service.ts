import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Observation, Weather} from "../shared/model/flur-dtos";

@Injectable({
  providedIn: 'root'
})
export class FlurService {

  private backendUrl = `api/flur`;
  constructor(private httpClient: HttpClient) {
  }

  public getLevel() : Observable<Observation[]> {
    let url = `${this.backendUrl}/level`;
    return this.httpClient.get<Observation[]>(url);
  }

  public getDischarge() : Observable<Observation[]> {
    let url = `${this.backendUrl}/discharge`;
    return this.httpClient.get<Observation[]>(url);
  }

  public getTemperature() : Observable<Observation[]> {
    let url = `${this.backendUrl}/temperature`;
    return this.httpClient.get<Observation[]>(url);
  }

  public getWeather() : Observable<Weather> {
    let url = `${this.backendUrl}/weather`;
    return this.httpClient.get<Weather>(url);
  }
}
