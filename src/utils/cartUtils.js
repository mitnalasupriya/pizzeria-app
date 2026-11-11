export function getItemBasePrice(item) {
  if (item.basePrice != null) return Number(item.basePrice);
  if (item.type === "custom") return 0;
  return Number(item.price);
}

export function getItemExtraCost(item) {
  return Number(item.extraCost ?? 0);
}

export function getItemUnitPrice(item) {
  return getItemBasePrice(item) + getItemExtraCost(item);
}

export function getPizzaSubtotal(items) {
  return items.reduce(
    (total, item) => total + getItemBasePrice(item) * item.quantity,
    0
  );
}

export function getIngredientsSubtotal(items) {
  return items.reduce(
    (total, item) => total + getItemExtraCost(item) * item.quantity,
    0
  );
}

export function getCartTotal(items) {
  return getPizzaSubtotal(items) + getIngredientsSubtotal(items);
}

export function matchesDefaultTopping(ingredient, defaultToppings) {
  const name = ingredient.tname.toLowerCase().trim();
  return defaultToppings.some((topping) => {
    const defaultName = topping.toLowerCase().trim();
    return defaultName.includes(name) || name.includes(defaultName);
  });
}
