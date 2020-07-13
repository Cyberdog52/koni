import { Component, OnInit } from '@angular/core';
import {MenuService} from "../menu.service";
import {RecipeService} from "./recipe.service";
import {Menu, Recipe} from "../../shared/model/menu-dtos";
import {DialogDeleteMenu} from "../menu.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-recipe',
  templateUrl: './menu-recipe.component.html',
  styleUrls: ['./menu-recipe.component.scss']
})
export class MenuRecipeComponent implements OnInit {

  constructor(private recipeService: RecipeService, public dialog: MatDialog) { }

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
    const dialogRef = this.dialog.open(DialogDeleteRecipe);

    dialogRef.afterClosed().subscribe(userClickedDelete => {
      if (userClickedDelete) {
        this.recipeService.delete(id).subscribe(() => {
          this.loadAllRecipes();
        });
        this.recipes.delete(id);
      }
    });
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

@Component({
  selector: 'dialog-delete-recipe',
  templateUrl: 'delete-recipe-dialog.html',
})
export class DialogDeleteRecipe {}
