import {Component, Input, OnInit} from '@angular/core';
import {Amount, Ingredient, Recipe} from "../../../../shared/model/menu-dtos";
import {IngredientService} from "../../ingredient.service";

@Component({
  selector: 'app-ingredient-table',
  templateUrl: './ingredient-table.component.html',
  styleUrls: ['./ingredient-table.component.scss']
})
export class IngredientTableComponent implements OnInit {

  @Input() recipe : Recipe;
  private loadedIngredients: Ingredient[] = [];
  newIngredientName: string;
  newAmount: Amount;

  constructor(private ingredientService: IngredientService) { }

  ngOnInit() {
    this.loadIngredients();
  }

  private loadIngredients() {
    this.ingredientService.getIngredients().subscribe(ingredients => {
      this.loadedIngredients = ingredients;
    });
  }

  addNewIngredient() {
    const alreadyLoadedIngredient = this.loadedIngredients.find(ingredient => ingredient.name.localeCompare(this.newIngredientName) == 0);
    if (alreadyLoadedIngredient) {
      this.recipe.ingredientIdMap.set(alreadyLoadedIngredient.id.toString(), this.newAmount);
      this.newAmount = null;
    } else {
      this.ingredientService.create(this.newIngredientName).subscribe(newIngredient => {
        this.loadedIngredients.push(newIngredient);
        this.recipe.ingredientIdMap.set(newIngredient.id.toString(), this.newAmount);
        this.newAmount = null;
      });
    }

    this.newIngredientName = "";
  }

  getIngredientIds(): string[] {
    return Object.keys(this.recipe.ingredientIdMap);
  }

  getAmount(ingredient: string) : Amount {
    return this.recipe.ingredientIdMap.get(ingredient);
  }

  removeIngredient(id: number) {
    this.recipe.ingredientIdMap.delete(id.toString());
  }

  getIngredientOptions(): string[] {
    return Array.from(this.loadedIngredients.map(ingredient => ingredient.name).values());
  }

  getIngredientName(ingredientId: string): string {
    const ingredient = this.loadedIngredients.find(ingredient => ingredient.id.toString().localeCompare(ingredientId) == 0);
    if (ingredient) {
      return ingredient.name;
    }
    return "";
  }
}
