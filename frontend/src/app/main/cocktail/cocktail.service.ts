import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {WerwoerterGame} from "../../shared/model/werwoerter-dtos";
import {HttpClient} from "@angular/common/http";
import {Drinks, Ingredients} from "../../shared/model/cocktail-dtos";

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  cocktailUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';

  constructor(private httpClient: HttpClient) { }

  public getRandomCocktail(): Observable<Drinks> {
    let url = `${this.cocktailUrl}random.php`;
    return this.httpClient.get<Drinks>(url);
  }

  search(searchStr: string): Observable<Drinks> {
    let url = `${this.cocktailUrl}search.php?s=${searchStr}`;
    return this.httpClient.get<Drinks>(url);
  }

  filter(filterStr: string): Observable<Drinks> {
    let url = `${this.cocktailUrl}filter.php?i=${filterStr}`;
    return this.httpClient.get<Drinks>(url);
  }

  getIngredients(): Observable<Ingredients> {
    let url = `${this.cocktailUrl}list.php?i=list`;
    return this.httpClient.get<Ingredients>(url);
  }

  getDrinkById(idStr: string): Observable<Drinks> {
    let url = `${this.cocktailUrl}lookup.php?i=${idStr}`;
    return this.httpClient.get<Drinks>(url);
  }
}
