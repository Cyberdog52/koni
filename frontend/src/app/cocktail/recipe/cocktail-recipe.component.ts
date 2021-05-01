import {Component, Input, OnInit} from '@angular/core';
import {Cocktail} from "../../shared/model/cocktail-dtos";

@Component({
  selector: 'cocktail-recipe',
  templateUrl: './cocktail-recipe.component.html',
  styleUrls: ['./cocktail-recipe.component.scss']
})
export class CocktailRecipeComponent implements OnInit {

  constructor() { }

  @Input() cocktail: Cocktail;

  ngOnInit() {
  }

  getAlcoholicIcon(): string {
    if (this.isAlcoholic()) {
      return "local_bar";
    }
    return "format_color_reset";
  }

  private isAlcoholic() {
    if (!this.cocktail.strAlcoholic) {
      return true;
    }
    return this.cocktail.strAlcoholic.localeCompare("Alcoholic") == 0;
  }

  getAlcoholicStr() {
    if (this.isAlcoholic()) {
      return "Alkoholisch";
    }
    return "Enthält kein Alkohol";
  }
}
