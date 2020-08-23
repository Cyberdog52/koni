
export interface Menu {
  id: number
  name: string
  menuParts: MenuPart[]
}

export class MenuPart {
  recipe: Recipe;
  numberOfPeople: number;

  constructor() {
  }

}

export class Recipe {
  id: number;
  title: string;
  ingredients: Ingredient[];
  steps: string[];
  numberOfPeople: number;
  linkToPicture: string;

  constructor() {
  }
}

export class Ingredient {
  amount: Amount;
  product: Product;
  recipeNames: string[];

  constructor( amount: Amount, product: Product) {
    this.amount = amount;
    this.product = product;
  }

}

export interface Product {
  id: number
  name: string
}

export class Amount {
  value: number;
  amountSize: AmountSize;

  constructor() {
  }

}

export enum AmountSize {
  UNDEFINED="UNDEFINED",
  G="G", KG="KG", DL="DL", TL="TL", EL="EL", KL="KL", L="L", PIECE="PIECE", LITTLE="LITTLE",ALOT="ALOT", DEMAND="DEMAND"
}

export interface AmountGroup {
  amountType: AmountType
  amountSize: AmountSize[];
}

export enum AmountType {
  WATER="WATER", PIECE="PIECE", SPOON="SPOON", WEIGHT="WEIGHT", UNDEFINED="UNDEFINED"
}
