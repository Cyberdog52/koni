import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ingredient} from "../../shared/model/menu-dtos";


@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private backendUrl = "api/ingredients/";

  constructor(private httpClient: HttpClient) {
  }

  public getIngredients(): Observable<Ingredient[]> {
    return this.httpClient.get<Ingredient[]>(this.backendUrl);
  }

  public create(ingredientName: string): Observable<Ingredient> {
    return this.httpClient.post<Ingredient>(`${this.backendUrl}`, ingredientName);
  }

}
