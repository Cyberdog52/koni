import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RecipeService} from "../recipe.service";
import {Amount, Recipe} from "../../../shared/model/menu-dtos";
import {IngredientService} from "../ingredient.service";

@Component({
  selector: 'app-recipe-overview',
  templateUrl: './recipe-overview.component.html',
  styleUrls: ['./recipe-overview.component.scss']
})
export class RecipeOverviewComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.loadRecipe();
  }

  private loadRecipe() {
    this.recipeService.loadRecipe(this.id).subscribe(loadedRecipe => {
      console.log(loadedRecipe);


      if (loadedRecipe.ingredientIdMap == null){
        loadedRecipe.ingredientIdMap = new Map<string, Amount>();
      }
      if (!(loadedRecipe.ingredientIdMap instanceof Map)) {
        loadedRecipe.ingredientIdMap = <Map<string, Amount>> loadedRecipe.ingredientIdMap;
      }
      if (Object.keys(loadedRecipe.ingredientIdMap).length == 0) {
        loadedRecipe.ingredientIdMap = new Map<string, Amount>();
      }


      //loadedRecipe.ingredientIdMap = <Map<string, Amount>> (loadedRecipe.ingredientIdMap);
      this.recipe = loadedRecipe;
      console.log(this.recipe.ingredientIdMap instanceof Map);
    })
  }

  save() {
    this.recipeService.save(this.recipe).subscribe(savedRecipe => {
      console.log(savedRecipe);
      if (savedRecipe.ingredientIdMap == null){
        savedRecipe.ingredientIdMap = new Map<string, Amount>();
      }
      if (!(savedRecipe.ingredientIdMap instanceof Map)) {
        savedRecipe.ingredientIdMap = <Map<string, Amount>> savedRecipe.ingredientIdMap;
      }
      if (Object.keys(savedRecipe.ingredientIdMap).length == 0) {
        savedRecipe.ingredientIdMap = new Map<string, Amount>();
      }
      this.recipe = savedRecipe;
    })
  }

  addNewStep() {
    this.recipe.steps.push("Neuer Arbeitsschritt " + this.recipe.steps.length);
  }

  removeStep(id: number) {
    this.recipe.steps.splice(id, 1);
  }


  changeStep(id, event) {
    console.log(event);
    this.recipe.steps[id] = event.target.value;
  }

  moveStepUp(id: number) {
    if (id == 0) {
      return;
    }
    const temp = this.recipe.steps[id];
    this.recipe.steps[id] = this.recipe.steps[id-1];
    this.recipe.steps[id-1] = temp;
  }
  moveStepDown(id: number) {
    if (id >= this.recipe.steps.length -1) {
      return;
    }
    const temp = this.recipe.steps[id];
    this.recipe.steps[id] = this.recipe.steps[id+1];
    this.recipe.steps[id+1] = temp;
  }


}
