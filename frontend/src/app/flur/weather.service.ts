import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private backendUrl = `graphs`;

  httpHeaders: HttpHeaders = new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  });

  constructor(private httpClient: HttpClient) {
  }

  public getLevel(stationId: number) : Observable<string> {
    let url = `${this.backendUrl}/${stationId}/level_${stationId}.csv`;
    return this.httpClient.get(url, {responseType: "text", headers: this.httpHeaders});
  }

  public getDischarge(stationId: number) : Observable<string> {
    let url = `${this.backendUrl}/${stationId}/discharge_${stationId}.csv`;
    return this.httpClient.get(url, {responseType: "text", headers: this.httpHeaders});
  }

  public getTemperature(stationId: number) : Observable<string> {
    let url = `${this.backendUrl}/${stationId}/temperature_${stationId}.csv`;
    return this.httpClient.get(url, {responseType: "text", headers: this.httpHeaders});
  }
}
