import { Component, OnInit } from '@angular/core';
import {CocktailService} from "../cocktail.service";
import {Drinks} from "../../shared/model/cocktail-dtos";

@Component({
  selector: 'search-cocktail',
  templateUrl: './search-cocktail.component.html',
  styleUrls: ['./search-cocktail.component.scss']
})
export class SearchCocktailComponent implements OnInit {
  searchStr: string = "";

  drinks: Drinks;

  constructor(private cocktailService: CocktailService) { }

  ngOnInit() {
  }

  searchCocktail() {
    if (this.searchStr.length == 0) {
      this.drinks = null;
      return;
    }
    this.cocktailService.search(this.searchStr).subscribe( response=>{
      console.log(response);
      this.drinks = response;
    }
    );
  }
}
