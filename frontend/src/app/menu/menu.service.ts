import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Menu} from "../shared/model/menu-dtos";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private backendUrl = "api/menu/";

  constructor(private httpClient: HttpClient) {
  }

  public getIds(): Observable<number[]> {
    return this.httpClient.get<number[]>(this.backendUrl + 'ids');
  }

  public loadMenu(id: number): Observable<Menu> {
    let url = `${this.backendUrl}${id}`;
    return this.httpClient.get<Menu>(url)
  }

  public save(menu: Menu): Observable<Menu> {
    return this.httpClient.post<Menu>(`${this.backendUrl}${menu.id}`, menu)
  }

  public create(): Observable<Menu> {
    return this.httpClient.get<Menu>(`${this.backendUrl}`)
  }

  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.backendUrl}${id}`);
  }
}
