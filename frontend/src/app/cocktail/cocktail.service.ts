import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Drinks, CocktailAsIngredients, Ingredients} from "../shared/model/cocktail-dtos";

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

  getIngredients(): Observable<CocktailAsIngredients> {
    let url = `${this.cocktailUrl}list.php?i=list`;
    return this.httpClient.get<CocktailAsIngredients>(url);
  }

  getDrinkById(idStr: string): Observable<Drinks> {
    let url = `${this.cocktailUrl}lookup.php?i=${idStr}`;
    return this.httpClient.get<Drinks>(url);
  }

  getIngredientsThatStartWith(stringInput: string): Observable<Ingredients>  {
    let url = `${this.cocktailUrl}search.php?i=${stringInput}`;
    return this.httpClient.get<Ingredients>(url);
  }
}
