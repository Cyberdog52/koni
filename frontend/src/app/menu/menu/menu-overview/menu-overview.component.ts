import {Component, OnInit} from '@angular/core';
import {Amount, Menu, MenuPart, Recipe} from "../../../shared/model/menu-dtos";
import {ActivatedRoute, Router} from "@angular/router";
import {MenuService} from "../menu.service";
import {ToastrService} from "ngx-toastr";
import {RecipeService} from "../../recipe/recipe.service";

@Component({
  selector: 'menu-overiew',
  templateUrl: './menu-overview.component.html',
  styleUrls: ['./menu-overview.component.scss']
})
export class MenuOverviewComponent implements OnInit {

  menu: Menu;
  id: number;
  newRecipePeople: string;
  newRecipe: Recipe;
  recipes: Map<number, Recipe> = new Map();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService,
              private toastrService: ToastrService,
              private menuService: MenuService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.loadMenu();
    this.loadRecipes();
  }

  private loadMenu() {
    this.menuService.loadMenu(this.id).subscribe(loadedMenu => {
      console.log(loadedMenu);
      this.menu = loadedMenu;
    })
  }

  private loadRecipes(): void {
    this.recipeService.getIds().subscribe(ids => {
      ids.forEach( id => {
          this.loadRecipe(id);
        }
      );
    });
  }

  loadRecipe(id: number): void {
    this.recipeService.loadRecipe(id).subscribe(recipe => {
      this.recipes.set(id, recipe);
    });
  }

  save() {
    this.menuService.save(this.menu).subscribe(savedMenu => {
      this.toastrService.success("Menu wurde gespeichert.", "Erfolg");
      this.menu = savedMenu;
    })
  }

  back() {
    this.router.navigateByUrl("/menu")
  }

  removeMenuPart(index: number) {
    this.menu.menuParts.splice(index, 1);
    this.save();
  }

  addNewRecipe() {
    if (this.newRecipe == null) {
      this.toastrService.warning( "Bitte wähle ein gültiges Rezept aus, bevor du ein Rezept zum Menu hinzufügen möchtest.");
      return;
    }
    if (this.newRecipePeople == null || this.newRecipePeople.length == 0) {
      this.toastrService.warning( "Bitte gib eine Anzahl Personen für das neue Rezept ein.");
      return;
    }

    const newMenuPart = new MenuPart();
    newMenuPart.numberOfPeople = ~~this.newRecipePeople;
    newMenuPart.recipe = this.newRecipe;

    this.menu.menuParts.push(newMenuPart);

    this.newRecipe = null;
    this.newRecipePeople = "";

    this.save();
  }

  getRecipes(): Recipe[] {
    return Array.from( this.recipes.values()).filter(recipe => !this.menu.menuParts.some(menupart => menupart.recipe.id == recipe.id));
  }

  menuPeopleChanged() {
    this.save();
  }

  titleChanged() {
    this.save();
  }
}
