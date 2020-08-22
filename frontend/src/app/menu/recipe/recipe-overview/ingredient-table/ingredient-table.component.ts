import {Component, Input, OnInit} from '@angular/core';
import {
  Amount,
  AmountGroup,
  AmountSize,
  AmountType, Ingredient,
  Product,
  Recipe
} from "../../../../shared/model/menu-dtos";
import {ProductService} from "../../product.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-ingredient-table',
  templateUrl: './ingredient-table.component.html',
  styleUrls: ['./ingredient-table.component.scss']
})
export class IngredientTableComponent implements OnInit {

  @Input() recipe : Recipe;
  private loadedProducts: Product[] = [];
  amountGroups: AmountGroup[];
  newProductName: string = "";
  newAmountSize: AmountSize;
  newAmountText: string = "";

  constructor(private productService: ProductService,
              private toastrService: ToastrService) { }

  ngOnInit() {
    this.loadProducts();
    this.initAmountGroups();
  }

  private loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.loadedProducts = products;
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
    if (this.newProductName == null || this.newProductName.length == 0) {
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

    const alreadyLoadedProduct = this.loadedProducts.find(product => product.name.localeCompare(this.newProductName) == 0);
    if (alreadyLoadedProduct) {
      this.addIngredient(alreadyLoadedProduct, newAmount);
    } else {
      this.productService.create(this.newProductName).subscribe(newProduct => {
        this.loadedProducts.push(newProduct);
        this.addIngredient(newProduct, newAmount);
      });
    }

    this.newProductName = "";
    this.newAmountText = "";
    this.newAmountSize = null;
  }

  addIngredient(product: Product, amount: Amount) {
    this.recipe.ingredients.push(new Ingredient(amount, product ));
  }


  getProductIds(): string[] {
    return Array.from(this.recipe.ingredients.map(ingredient => ingredient.product.id.toString()));
  }

  getAmountString(amount: Amount) : string {
    return amount.value + " " + this.amountSizeToName(amount.amountSize);
  }

  removeIngredient(index: number) {
    this.recipe.ingredients.splice(index, 1);
  }

  getIngredientOptions(): string[] {
    return Array.from(this.loadedProducts.map(product => product.name)
      .filter(productName => productName.toLowerCase().startsWith(this.newProductName.toLowerCase())).values());
  }

  getIngredientName(ingredientId: string): string {
    const ingredient = this.loadedProducts.find(ingredient => ingredient.id.toString().localeCompare(ingredientId) == 0);
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
