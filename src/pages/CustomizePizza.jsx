import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ingredients from "../data/ingredients.json";
import { CartContext } from "../context/CartContext";
import "../styles/CustomizePizza.css";
import PopupMessage from "../components/PopupMessage";
import { matchesDefaultTopping } from "../utils/cartUtils";

function CustomizePizza() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [popupMessage, setPopupMessage] = useState("");

  const { cartItems, updateCustomPizza } = useContext(CartContext);
  const pizzaToEdit = cartItems.find((item) => item.id === id);

  const isCustomPizza = pizzaToEdit?.type === "custom";
  const defaultToppings = isCustomPizza
    ? []
    : pizzaToEdit?.defaultToppings ?? pizzaToEdit?.topping ?? [];

  const getInitialSelection = () => {
    if (!pizzaToEdit) return [];

    if (isCustomPizza) {
      return ingredients.filter((ingredient) =>
        (pizzaToEdit.extraIngredients ?? []).some(
          (item) => item.id === ingredient.id
        )
      );
    }

    const selectedNames = new Set([
      ...defaultToppings,
      ...(pizzaToEdit.extraIngredients ?? []).map((item) => item.tname),
    ]);

    return ingredients.filter(
      (ingredient) =>
        matchesDefaultTopping(ingredient, defaultToppings) ||
        [...selectedNames].some((name) => {
          const normalized = name.toLowerCase().trim();
          const ingredientName = ingredient.tname.toLowerCase().trim();

          return (
            normalized.includes(ingredientName) ||
            ingredientName.includes(normalized)
          );
        })
    );
  };

  const [selectedIngredients, setSelectedIngredients] = useState(
    getInitialSelection
  );

  if (!pizzaToEdit) {
    return (
      <div className="customize-container">
        <h2>Pizza Not Found</h2>
      </div>
    );
  }

  const handleIngredientChange = (ingredient) => {
    const isSelected = selectedIngredients.some(
      (item) => item.id === ingredient.id
    );

    if (isSelected) {
      setSelectedIngredients(
        selectedIngredients.filter((item) => item.id !== ingredient.id)
      );
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const extraIngredients = isCustomPizza
    ? selectedIngredients
    : selectedIngredients.filter(
      (ingredient) => !matchesDefaultTopping(ingredient, defaultToppings)
    );

  const extraCost = extraIngredients.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  const basePrice = isCustomPizza
    ? 0
    : pizzaToEdit.basePrice ?? Number(pizzaToEdit.price);

  const totalCost = basePrice + extraCost;

  const handleSaveChanges = () => {
    if (selectedIngredients.length === 0) {
      setPopupMessage("Please select at least one ingredient");
      return;
    }

    const updatedPizza = isCustomPizza
      ? {
        name: "Custom Pizza",
        basePrice: 0,
        extraCost,
        price: extraCost,
        extraIngredients,
        image: selectedIngredients[0].image,
        description: "Customized pizza updated by user",
        ingredients: selectedIngredients.map((item) => item.tname),
        topping: selectedIngredients.map((item) => item.tname),
      }
      : {
        basePrice,
        extraCost,
        price: totalCost,
        extraIngredients,
        defaultToppings,
        topping: defaultToppings,
        ingredients: [
          ...defaultToppings,
          ...extraIngredients.map((item) => item.tname),
        ],
      };
    updateCustomPizza(id, updatedPizza);

    setPopupMessage("Pizza updated successfully");
    setTimeout(() => {
      navigate("/cart");
    }, 1000);
  };

  return (
    <div className="customize-container">
      <h2>Customize Your Pizza</h2>

      <p className="customize-description">
        {isCustomPizza
          ? "Add or remove ingredients before checkout."
          : `Base price ₹${basePrice}. Extra toppings are charged separately.`}
      </p>

      <div className="customize-table">
        {ingredients.map((ingredient) => {
          const isChecked = selectedIngredients.some(
            (item) => item.id === ingredient.id
          );
          const isDefault = !isCustomPizza &&
            matchesDefaultTopping(ingredient, defaultToppings);

          return (
            <div className="customize-row" key={ingredient.id}>
              <div className="customize-image-box">
                <img src={ingredient.image} alt={ingredient.tname} />
              </div>

              <div className="customize-info">
                <span>{ingredient.tname}</span>
                <span>
                  {isDefault ? "Included" : `₹${Number(ingredient.price).toFixed(2)}`}
                </span>
              </div>

              <div className="customize-action">
                <input
                  type="checkbox"
                  checked={isChecked}
                  disabled={isDefault}
                  onChange={() => handleIngredientChange(ingredient)}
                />
                <span>{isDefault ? "Included" : isChecked ? "Added" : "Add"}</span>
              </div>
            </div>
          );
        })}

        <div className="customize-total">
          {isCustomPizza ? (
            <>Total Cost : ₹{extraCost.toFixed(2)}</>
          ) : (
            <>
              Base : ₹{basePrice.toFixed(2)} + Extras : ₹
              {extraCost.toFixed(2)} = ₹{totalCost.toFixed(2)}
            </>
          )}
        </div>

        <div className="customize-button-box">
          <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
      </div>

      {popupMessage && (
        <PopupMessage
          message={popupMessage}
          showButton={popupMessage !== "Pizza updated successfully"}
          onClose={() => setPopupMessage("")}
        />
      )}
    </div>
  );
}

export default CustomizePizza;
