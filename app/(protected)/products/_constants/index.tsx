export enum MenuCategory {
  DOCE = "Doce",
  SALGADO = "Salgado",
  PIZZA = "Pizza",
  SOBREMESA = "Sobremesa",
  BEBIDA = "Bebida",
  COMBO = "Combo",
}

export const menuCategories = Object.entries(MenuCategory).map(
  ([key, value]) => ({
    value: MenuCategory[key as keyof typeof MenuCategory],
    label: value,
  }),
);
