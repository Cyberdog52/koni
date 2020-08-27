import { Component, OnInit } from '@angular/core';
import {MenuService} from "../../menu/menu.service";
import {RecipeService} from "../recipe.service";
import {Menu, Recipe} from "../../../shared/model/menu-dtos";
import {DialogDeleteMenu} from "../../menu/menu-table/menu-table.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'recipe-table',
  templateUrl: './recipe-table.component.html',
  styleUrls: ['./recipe-table.component.scss']
})
export class RecipeTableComponent implements OnInit {

  constructor(private recipeService: RecipeService,
              public dialog: MatDialog,
              private router: Router ) { }

  recipes: Map<number, Recipe> = new Map();

  displayedColumns: string[] = [ 'name', 'image','numberOfPeople','ingredientCount', 'stepCount', 'view','edit', 'delete' ];

  ngOnInit() {
    this.loadAllRecipes();
  }

  getRecipes(): Recipe[] {
    return Array.from( this.recipes.values()).sort((r1, r2) => r1.title.localeCompare(r2.title));
  }

  getRecipe(id: number): Recipe {
    return this.recipes.get(id);
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
    if (recipe.ingredients) {
      const values = Object.keys(recipe.ingredients).map(function(key) {
        return recipe.ingredients[key];
      });
      return values.length;
    }

    return 0;
  }

  getStepsCount(recipe: Recipe): number {
    return recipe.steps.length;
  }

  editRecipe(id: number) {
    this.router.navigate(['/recipe', id], { queryParams: { edit: 'true' }});
  }

  viewRecipe(id: number) {
    this.router.navigate(['/recipe', id], { queryParams: { edit: 'false' }});

  }
}

@Component({
  selector: 'dialog-delete-recipe',
  templateUrl: '../delete-recipe-dialog.html',
})
export class DialogDeleteRecipe {}
