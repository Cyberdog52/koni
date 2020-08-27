import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ingredient, Menu, Recipe} from "../../shared/model/menu-dtos";


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private backendUrl = "api/recipe/";

  constructor(private httpClient: HttpClient) {
  }

  public getIds(): Observable<number[]> {
    return this.httpClient.get<number[]>(this.backendUrl + 'ids');
  }

  public loadRecipe(id: number): Observable<Recipe> {
    let url = `${this.backendUrl}${id}`;
    return this.httpClient.get<Recipe>(url)
  }

  public save(recipe: Recipe): Observable<Recipe> {
    return this.httpClient.post<Recipe>(`${this.backendUrl}${recipe.id}`, recipe)
  }

  public create(): Observable<Recipe> {
    return this.httpClient.get<Recipe>(`${this.backendUrl}`)
  }

  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.backendUrl}${id}`);
  }

  public getIngredients(id: number, numberOfPeople: number): Observable<Ingredient[]> {
    return this.httpClient.get<Ingredient[]>(`${this.backendUrl}${id}/ingredients/${numberOfPeople}`)
  }
}
