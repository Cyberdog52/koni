import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Cocktail, Drinks, CocktailAsIngredient} from "../../shared/model/cocktail-dtos";
import {CocktailService} from "../cocktail.service";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from "@angular/material";

@Component({
  selector: 'filter-cocktail',
  templateUrl: './filter-cocktail.component.html',
  styleUrls: ['./filter-cocktail.component.scss']
})
export class FilterCocktailComponent implements OnInit {

  cocktails: Cocktail[] = [];

  matchingIds : string[] = [];

  numberOfIngredientsThatDontMatch : number = 0;

  randomCocktail : Cocktail;

  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ingredientCtrl = new FormControl();
  filteredIngredients: Observable<string[]>;
  selectedIngredients: string[] = [];
  allIngredients: string[] = [];

  @ViewChild('cocktailInput', {static: false}) cocktailInupt: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  nonMatchingIngredientOptions: number[] =  [0, 1, 2, 3, 4, 5, 9999];

  constructor(private cocktailService: CocktailService) { }

  ngOnInit() {
    this.getIngredients();
    this.filteredIngredients = this.ingredientCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allIngredients.slice()));
  }

  getIngredients() {
    this.cocktailService.getIngredients().subscribe(response => {
      if (response.drinks) {
        response.drinks.forEach(ingredient => {
          this.allIngredients.push(ingredient.strIngredient1);
          //assign allIngredients new such that it will get loaded again by the frontend
          //the sorting is not necessary
          this.allIngredients = this.allIngredients.sort((a, b) => {return a.localeCompare(b)});
        });
      }
    })
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our ingredient
    if ((value || '').trim()) {
      this.selectedIngredients.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.ingredientCtrl.setValue(null);
    this.getMatchingIds()
  }

  remove(fruit: string): void {
    const index = this.selectedIngredients.indexOf(fruit);

    if (index >= 0) {
      this.selectedIngredients.splice(index, 1);
    }
    this.getMatchingIds();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedIngredients.push(event.option.viewValue);
    this.cocktailInupt.nativeElement.value = '';
    this.ingredientCtrl.setValue(null);
    this.getMatchingIds();
  }

  getMatchingIds() {
    this.matchingIds = [];
    var counter = this.selectedIngredients.length;
    this.selectedIngredients.forEach(ingredientStr => {
      this.cocktailService.filter(ingredientStr).subscribe( response =>{
          if (response.drinks) {
            response.drinks.forEach( cocktail => {
              const id = cocktail.idDrink;
              if (!this.matchingIds.includes(id)) {
                this.matchingIds.push(id);
              }
            });
          }
        counter = counter -1;
        if (counter == 0) {
          this.getDrinksForMatchingIds();
        }
        }
      );
    })
  }

  private getDrinksForMatchingIds() {
    this.cocktails = [];
    this.matchingIds.forEach(idStr => {
      this.cocktailService.getDrinkById(idStr).subscribe( response => {
        if (response.drinks) {
          const cocktail = response.drinks[0];
          if (this.isOk(cocktail)) {
            this.cocktails.push(cocktail);
          }
        }
      });
    });
  }

  private isOk(cocktail: Cocktail) {
    const totalIngredients = FilterCocktailComponent.getTotalIngredients(cocktail);
    const matchingIngredients = this.getNumberOfMatchingIngredients(cocktail);

    return totalIngredients <= +matchingIngredients + +this.numberOfIngredientsThatDontMatch;
  }

  private getNumberOfMatchingIngredients(cocktail: Cocktail): number {
    const ingredientStrings = FilterCocktailComponent.getIngredientsForCocktail(cocktail);
    var count = 0;
    ingredientStrings.forEach(ingredientStr => {
      if (this.selectedIngredients.includes(ingredientStr)) {
        count += 1;
      }
    });
    return count;
  }

  private static getTotalIngredients(cocktail: Cocktail): number {
    return FilterCocktailComponent.getIngredientsForCocktail(cocktail).length;
  }

  private static getIngredientsForCocktail(cocktail: Cocktail): string[] {
    const ingredientStrings = [];
    var ingredient = cocktail.strIngredient1;
    FilterCocktailComponent.addIngredientIfValid(ingredient, ingredientStrings);
    ingredient = cocktail.strIngredient2;
    FilterCocktailComponent.addIngredientIfValid(ingredient, ingredientStrings);
    ingredient = cocktail.strIngredient3;
    FilterCocktailComponent.addIngredientIfValid(ingredient, ingredientStrings);
    ingredient = cocktail.strIngredient4;
    FilterCocktailComponent.addIngredientIfValid(ingredient, ingredientStrings);
    ingredient = cocktail.strIngredient5;
    FilterCocktailComponent.addIngredientIfValid(ingredient, ingredientStrings);
    ingredient = cocktail.strIngredient6;
    FilterCocktailComponent.addIngredientIfValid(ingredient, ingredientStrings);
    ingredient = cocktail.strIngredient7;
    FilterCocktailComponent.addIngredientIfValid(ingredient, ingredientStrings);
    ingredient = cocktail.strIngredient8;
    FilterCocktailComponent.addIngredientIfValid(ingredient, ingredientStrings);
    ingredient = cocktail.strIngredient9;
    FilterCocktailComponent.addIngredientIfValid(ingredient, ingredientStrings);
    ingredient = cocktail.strIngredient10;
    FilterCocktailComponent.addIngredientIfValid(ingredient, ingredientStrings);
    ingredient = cocktail.strIngredient11;
    FilterCocktailComponent.addIngredientIfValid(ingredient, ingredientStrings);
    ingredient = cocktail.strIngredient12;
    FilterCocktailComponent.addIngredientIfValid(ingredient, ingredientStrings);
    ingredient = cocktail.strIngredient13;
    FilterCocktailComponent.addIngredientIfValid(ingredient, ingredientStrings);
    ingredient = cocktail.strIngredient14;
    FilterCocktailComponent.addIngredientIfValid(ingredient, ingredientStrings);
    ingredient = cocktail.strIngredient15;

    return ingredientStrings;
  }


  private static addIngredientIfValid(ingredient, ingredientStrings) {
    if (ingredient && ingredient.length > 0) {
      ingredientStrings.push(ingredient)
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allIngredients.filter(cocktail => cocktail.toLowerCase().indexOf(filterValue) === 0);
  }


  ingredientOptionsToStr(option: number): string {
    switch (option) {
      case 0:
        return "Alle Zutaten müssen übereinstimmen";
      case 9999:
        return "Eine gewählte Zutat reicht.";
      default:
        return String(option);
    }
  }

  changedNumberOfNonMatchingIngredients() {
    this.getDrinksForMatchingIds();
  }

  getFilterCocktailTitle(): string {
    const amount = this.cocktails.length;
    if (amount == 0) {
      return ""
    }
    if (amount == 1) {
      return "1 Cocktail"
    }
    return String(amount) + " Cocktails"
  }

  generateRandom() {
    const index = this.randomInt(0, this.cocktails.length-1);
    this.randomCocktail = this.cocktails[index];
  }

  private randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  deleteRandom() {
    this.randomCocktail = null;
  }

  pressedKey() {
    const stringInput = this.cocktailInupt.nativeElement.value;
    this.cocktailService.getIngredientsThatStartWith(stringInput).subscribe( response => {
      if (response.ingredients) {
        response.ingredients.forEach( ingredient => {
          if (this.allIngredients.includes(ingredient.strIngredient)) {
            console.log("already contains", ingredient.strIngredient)
          } else {
            this.allIngredients.push(ingredient.strIngredient);
            console.log("pushing ", ingredient.strIngredient)
          }
        });
      }
    })
  }
}
