import { Component, OnInit } from '@angular/core';
import {CocktailService} from "../cocktail.service";
import {Cocktail} from "../../shared/model/cocktail-dtos";

@Component({
  selector: 'completely-random-cocktail',
  templateUrl: './completely-random-cocktail.component.html',
  styleUrls: ['./completely-random-cocktail.component.scss']
})
export class CompletelyRandomCocktailComponent implements OnInit {
  constructor(private cocktailService: CocktailService) { }

  randomCocktail : Cocktail;

  ngOnInit() {
    this.loadRandomCocktail();
  }

  private loadRandomCocktail() {
    this.cocktailService.getRandomCocktail().subscribe(response => {
      if (response.drinks.length > 0) {
        this.randomCocktail = response.drinks[0];
      }
    });
  }

  getRandomCocktail() {
    return this.randomCocktail;
  }
}
