import { Component, OnInit } from '@angular/core';
import {MenuService} from "../menu.service";
import {RecipeService} from "./recipe.service";
import {Menu, Recipe} from "../../shared/model/menu-dtos";
import {DialogDeleteMenu} from "../menu.component";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  constructor(private recipeService: RecipeService) { }

  recipes: Map<number, Recipe> = new Map();

  displayedColumns: string[] = ['name', 'ingredientCount', 'stepCount', 'edit', 'delete', ];

  ngOnInit() {
    this.loadAllRecipes();
  }

  getRecipes(): Recipe[] {
    return Array.from( this.recipes.values());
  }

  getRecipe(id: number): Recipe {
    return this.recipes.get(id);
  }

  saveRecipe(id: number) {
    const recipe = this.getRecipe(id);
    if (recipe == null) {
      return;
    }
    this.recipeService.save(recipe).subscribe(savedRecipe => {
      this.recipes.set(savedRecipe.id, savedRecipe);
    })
  }

  createRecipe() {
    this.recipeService.create().subscribe(recipe => {
      this.recipes.set(recipe.id, recipe);
    })
  }

  loadAllRecipes() {
    this.recipeService.getIds().subscribe(ids => {
      ids.forEach( id => {
          this.loadRecipe(id);
        }
      );
    });
  }

  deleteRecipe(id: number) {
    /*
    const dialogRef = this.dialog.open(DialogDeleteMenu);

    dialogRef.afterClosed().subscribe(userClickedDelete => {
      if (userClickedDelete) {
        this.menuService.delete(id).subscribe(() => {
          this.loadAllRecipes();
        });
        this.menus.delete(id);
      }
    });
    */


  }

  loadRecipe(id: number): void {
    this.recipeService.loadRecipe(id).subscribe(recipe => {
      this.recipes.set(id, recipe);
    });
  }

  getIngredientCount(recipe: Recipe): number {
    if (recipe.ingredientMap) {
      const values = Object.keys(recipe.ingredientMap).map(function(key) {
        return recipe.ingredientMap[key];
      });
      return values.length;
    }

    return 0;
  }

  getStepsCount(recipe: Recipe): number {
    return recipe.steps.length;
  }

  editRecipe(id: number) {
    // TODO
  }
}
