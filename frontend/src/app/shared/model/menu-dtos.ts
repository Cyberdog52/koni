
export interface Menu {
  id: number
  recipeMap: Map<Recipe, number>
}

export interface Recipe {
  id: number
  title: string
  ingredientMap: Map<Ingredient, Amount>
  steps: string[]
}

export interface Ingredient {
  name: string
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
