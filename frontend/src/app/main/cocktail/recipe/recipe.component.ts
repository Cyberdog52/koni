import {Component, Input, OnInit} from '@angular/core';
import {Cocktail} from "../../../shared/model/cocktail-dtos";

@Component({
  selector: 'recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

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
