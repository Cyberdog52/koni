import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../../../shared/model/menu-dtos";

@Component({
  selector: 'app-recipe-overview',
  templateUrl: './recipe-overview.component.html',
  styleUrls: ['./recipe-overview.component.scss']
})
export class RecipeOverviewComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.loadRecipe();
  }

  private loadRecipe() {
    this.recipeService.loadRecipe(this.id).subscribe(loadedRecipe => {
      console.log(loadedRecipe);
      this.recipe = loadedRecipe;
    })
  }

  save() {
    console.log(this.recipe);
    console.log("saving")
    this.recipeService.save(this.recipe).subscribe(savedRecipe => {
      console.log(savedRecipe);
      this.recipe = savedRecipe;
    })
  }

  addNewStep() {
    this.recipe.steps.push("");
  }

  removeStep(id: number) {
    this.recipe.steps.splice(id, 1);
  }


  changeStep(id, event) {
    console.log(event);
    this.recipe.steps[id] = event.target.value;
  }
}
