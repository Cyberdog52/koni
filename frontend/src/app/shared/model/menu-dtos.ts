
export interface Menu {
  id: number
  title: string
  recipeMap: Map<Recipe, number>
}

export class Recipe {
  id: number;
  title: string;
  ingredientMap: Map<string, Amount>;
  steps: string[];

  constructor() {
  }
}

export interface Amount {
  value: number
  amountSize: AmountSize

}

export enum AmountSize {
  G="G", KG="KG", DL="DL", TL="TL", EL="EL", L="L", PIECE="PIECE"
}

export enum AmountType {
  WATER="WATER", PIECE="PIECE", SPOON="SPOON", WEIGHT="WEIGHT", UNDEFINED="UNDEFINED"
}
