import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Amount, AmountGroup, AmountSize, AmountType, Ingredient, Menu} from "../../../shared/model/menu-dtos";
import {MenuService} from "../menu.service";
import * as FileSaver from "file-saver";
import {FileSaverOptions} from "file-saver";


@Component({
  selector: 'menu-ingredient-table',
  templateUrl: './menu-ingredient-table.component.html',
  styleUrls: ['./menu-ingredient-table.component.scss']
})
export class MenuIngredientTableComponent implements OnInit, OnChanges {
  public menuIngredients: Ingredient[] = [];

  constructor(private menuService: MenuService) { }

  @Input() menu: Menu;

  public displayedColumns: string[] = ['product', 'amount', 'recipeNames' ];

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadMenuIngredientTable();
  }

  private loadMenuIngredientTable() {
    if (this.menu == null) {
      this.menuIngredients = [];
      return;
    }

    this.menuService.getMenuIngredients(this.menu.id).subscribe(loadedMenuIngredients => {
      console.log(loadedMenuIngredients);
      this.menuIngredients = loadedMenuIngredients;
    })
  }

  getAmountString(amount: Amount) : string {
    return amount.value + " " + this.amountSizeToName(amount.amountSize);
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
      case AmountSize.ALOT: return "Viel";
      case AmountSize.KL: return "Kaffeelöffel";
    }
  }

  getRecipeNames(menuIngredient: Ingredient): string {
    return menuIngredient.recipeNames.join( ", ");
  }

  downloadIngredients() {
    let csv = this.menuIngredients.map(ingredient => [ingredient.product.name, this.getAmountString(ingredient.amount), this.getRecipeNames(ingredient)].join(';'));
    let csvArray = csv.join('\r\n');

    let blob = new Blob(["\ufeff"+csvArray], {type: 'text/csv;charset=utf-8' });
    FileSaver.saveAs(blob, "zutaten_" + this.menu.name + ".csv");
  }
}
