
export interface Menu {
  id: number
  title: string
  recipeMap: Map<Recipe, number>
}

export class Recipe {
  id: number;
  title: string;
  ingredientIdMap: Map<string, Amount>;
  steps: string[];

  constructor() {
  }
}

export interface Ingredient {
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
