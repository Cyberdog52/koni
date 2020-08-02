import {Component, Input, OnInit} from '@angular/core';
import {Amount, AmountGroup, AmountSize, AmountType, Ingredient, Recipe} from "../../../../shared/model/menu-dtos";
import {IngredientService} from "../../ingredient.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-ingredient-table',
  templateUrl: './ingredient-table.component.html',
  styleUrls: ['./ingredient-table.component.scss']
})
export class IngredientTableComponent implements OnInit {

  @Input() recipe : Recipe;
  private loadedIngredients: Ingredient[] = [];
  amountGroups: AmountGroup[];
  newIngredientName: string = "";
  newAmountSize: AmountSize;
  newAmountText: string = "";

  constructor(private ingredientService: IngredientService,
              private toastrService: ToastrService) { }

  ngOnInit() {
    this.loadIngredients();
    this.initAmountGroups();
  }

  private loadIngredients(): void {
    this.ingredientService.getIngredients().subscribe(ingredients => {
      this.loadedIngredients = ingredients;
    });
  }

  private initAmountGroups(): void {
    this.amountGroups = [
      {amountType: AmountType.WEIGHT, amountSize: [AmountSize.G, AmountSize.KG]},
      {amountType: AmountType.PIECE, amountSize: [AmountSize.PIECE]},
      {amountType: AmountType.WATER, amountSize: [AmountSize.DL, AmountSize.L]},
      {amountType: AmountType.SPOON, amountSize: [AmountSize.EL, AmountSize.TL]},
      {amountType: AmountType.UNDEFINED, amountSize: [AmountSize.UNDEFINED, AmountSize.LITTLE, AmountSize.DEMAND]}
      ];
  }


  addNewIngredient() {
    if (this.newIngredientName == null || this.newIngredientName.length == 0) {
      this.toastrService.warning( "Bitte gib der neuen Zutat einen Namen, bevor du die Zutat hinzufügst.");
      return;
    }
    if (this.newAmountText == null || this.newAmountText.length == 0) {
      this.toastrService.warning( "Bitte gib eine Menge ein, bevor du eine neue Zutat hinzufügst.");
      return;
    }
    if (this.newAmountSize == null) {
      this.toastrService.warning( "Bitte wähle für die neue Zutat eine Mengenangabe aus.");
      return;
    }

    const newAmount = new Amount();
    newAmount.amountSize = this.newAmountSize;
    newAmount.value = +this.newAmountText;

    if (isNaN(newAmount.value)) {
      this.toastrService.warning( this.newAmountText +" ist keine Zahl. Bitte gib eine Zahl ein");
      return;
    }

    const alreadyLoadedIngredient = this.loadedIngredients.find(ingredient => ingredient.name.localeCompare(this.newIngredientName) == 0);
    if (alreadyLoadedIngredient) {
      this.addIngredient(alreadyLoadedIngredient.id.toString(), newAmount);
    } else {
      this.ingredientService.create(this.newIngredientName).subscribe(newIngredient => {
        this.loadedIngredients.push(newIngredient);
        this.addIngredient(newIngredient.id.toString(), newAmount);
      });
    }

    this.newIngredientName = "";
    this.newAmountText = "";
    this.newAmountSize = null;
  }

  addIngredient(idString: string, amount: Amount) {
    this.recipe.ingredientIdMap.set(idString, amount);
  }

  getIngredientIds(): string[] {
    return Array.from(this.recipe.ingredientIdMap.keys());
  }

  getAmountString(ingredient: string) : string {
    const amount = this.recipe.ingredientIdMap.get(ingredient);
    return amount.value + " " + this.amountSizeToName(amount.amountSize);
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

  amountGroupToName(group: AmountGroup): string {
    switch(group.amountType) {
      case AmountType.PIECE: return "Stück";
      case AmountType.UNDEFINED: return "Ungenau";
      case AmountType.WEIGHT: return "Gewicht";
      case AmountType.WATER: return "Wasser";
      case AmountType.SPOON: return "Löffel";
    }
  }

  amountSizeToName(amountSize: AmountSize): string {
    switch (amountSize) {
      case AmountSize.DL: return "Deziliter";
      case AmountSize.EL: return "Esslöffel";
      case AmountSize.G: return "Gramm";
      case AmountSize.KG: return "Kilogramm";
      case AmountSize.L: return "Liter";
      case AmountSize.PIECE: return "Stück";
      case AmountSize.TL: return "Teelöffel";
      case AmountSize.UNDEFINED: return "Undefiniert";
      case AmountSize.DEMAND: return "Nach Bedarf";
      case AmountSize.LITTLE: return "Ein wenig";
    }
  }
}
