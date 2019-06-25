import {Component, Input, OnInit} from '@angular/core';
import {Cocktail} from "../../../../shared/model/cocktail-dtos";

@Component({
  selector: 'cocktail-instructions',
  templateUrl: './cocktail-instructions.component.html',
  styleUrls: ['./cocktail-instructions.component.scss']
})
export class CocktailInstructionsComponent implements OnInit {

  constructor() { }

  showInstructions = false;

  @Input() cocktail: Cocktail;

  ngOnInit() {
  }

  toggleShowInstructions() {
    this.showInstructions = !this.showInstructions;
  }

  getIngredients(): Ingredient[] {
    const ingredients = [];
    if (this.cocktail.strIngredient1 && this.cocktail.strIngredient1.length > 0) {
      const newIngredient : Ingredient = {
        name: this.cocktail.strIngredient1,
        measure: this.cocktail.strMeasure1
      };
      ingredients.push(newIngredient)
    }
    if (this.cocktail.strIngredient2 && this.cocktail.strIngredient2.length > 0) {
      const newIngredient : Ingredient = {
        name: this.cocktail.strIngredient2,
        measure: this.cocktail.strMeasure2
      };
      ingredients.push(newIngredient)
    }
    if (this.cocktail.strIngredient3 && this.cocktail.strIngredient3.length > 0) {
      const newIngredient : Ingredient = {
        name: this.cocktail.strIngredient3,
        measure: this.cocktail.strMeasure3
      };
      ingredients.push(newIngredient)
    }
    if (this.cocktail.strIngredient4 && this.cocktail.strIngredient4.length > 0) {
      const newIngredient : Ingredient = {
        name: this.cocktail.strIngredient4,
        measure: this.cocktail.strMeasure4
      };
      ingredients.push(newIngredient)
    }
    if (this.cocktail.strIngredient5 && this.cocktail.strIngredient5.length > 0) {
      const newIngredient : Ingredient = {
        name: this.cocktail.strIngredient5,
        measure: this.cocktail.strMeasure5
      };
      ingredients.push(newIngredient)
    }
    if (this.cocktail.strIngredient6 && this.cocktail.strIngredient6.length > 0) {
      const newIngredient : Ingredient = {
        name: this.cocktail.strIngredient6,
        measure: this.cocktail.strMeasure6
      };
      ingredients.push(newIngredient)
    }
    if (this.cocktail.strIngredient7 && this.cocktail.strIngredient7.length > 0) {
      const newIngredient : Ingredient = {
        name: this.cocktail.strIngredient7,
        measure: this.cocktail.strMeasure7
      };
      ingredients.push(newIngredient)
    }
    if (this.cocktail.strIngredient8 && this.cocktail.strIngredient8.length > 0) {
      const newIngredient : Ingredient = {
        name: this.cocktail.strIngredient8,
        measure: this.cocktail.strMeasure8
      };
      ingredients.push(newIngredient)
    }
    if (this.cocktail.strIngredient9 && this.cocktail.strIngredient9.length > 0) {
      const newIngredient : Ingredient = {
        name: this.cocktail.strIngredient9,
        measure: this.cocktail.strMeasure9
      };
      ingredients.push(newIngredient)
    }
    if (this.cocktail.strIngredient10 && this.cocktail.strIngredient10.length > 0) {
      const newIngredient : Ingredient = {
        name: this.cocktail.strIngredient10,
        measure: this.cocktail.strMeasure10
      };
      ingredients.push(newIngredient)
    }
    if (this.cocktail.strIngredient11 && this.cocktail.strIngredient11.length > 0) {
      const newIngredient : Ingredient = {
        name: this.cocktail.strIngredient11,
        measure: this.cocktail.strMeasure11
      };
      ingredients.push(newIngredient)
    }
    if (this.cocktail.strIngredient12 && this.cocktail.strIngredient12.length > 0) {
      const newIngredient : Ingredient = {
        name: this.cocktail.strIngredient12,
        measure: this.cocktail.strMeasure12
      };
      ingredients.push(newIngredient)
    }
    if (this.cocktail.strIngredient13 && this.cocktail.strIngredient13.length > 0) {
      const newIngredient : Ingredient = {
        name: this.cocktail.strIngredient13,
        measure: this.cocktail.strMeasure13
      };
      ingredients.push(newIngredient)
    }
    if (this.cocktail.strIngredient14 && this.cocktail.strIngredient14.length > 0) {
      const newIngredient : Ingredient = {
        name: this.cocktail.strIngredient14,
        measure: this.cocktail.strMeasure14
      };
      ingredients.push(newIngredient)
    }
    if (this.cocktail.strIngredient15 && this.cocktail.strIngredient15.length > 0) {
      const newIngredient : Ingredient = {
        name: this.cocktail.strIngredient15,
        measure: this.cocktail.strMeasure15
      };
      ingredients.push(newIngredient)
    }
    return ingredients;
  }

  getGlassText(): string {
    return "Glass: " + this.cocktail.strGlass;
  }
}

export interface Ingredient {
  name: string,
  measure: string
}
