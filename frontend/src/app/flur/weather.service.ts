import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private backendUrl = `graphs`;

  httpHeaders: HttpHeaders = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  });

  constructor(private httpClient: HttpClient) {
    if (environment.production) {
      this.backendUrl = `https://www.hydrodaten.admin.ch/graphs`;
    }
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
