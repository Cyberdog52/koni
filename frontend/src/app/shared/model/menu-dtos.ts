
export interface Menu {
  id: number
  title: string
  menuParts: MenuPart[]
}

export interface MenuPart {
  recipe: Recipe
  numberOfPeople: number
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
  id: number;
  amount: Amount;
  product: Product;

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
  G="G", KG="KG", DL="DL", TL="TL", EL="EL", L="L", PIECE="PIECE", LITTLE="LITTLE", DEMAND="DEMAND"
}

export interface AmountGroup {
  amountType: AmountType
  amountSize: AmountSize[];
}

export enum AmountType {
  WATER="WATER", PIECE="PIECE", SPOON="SPOON", WEIGHT="WEIGHT", UNDEFINED="UNDEFINED"
}
