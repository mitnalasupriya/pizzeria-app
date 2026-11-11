import { useContext, useState } from "react";
import ingredients from "../data/ingredients.json";
import { CartContext } from "../context/CartContext";
import PopupMessage from "../components/PopupMessage";
import "../styles/BuildPizza.css";

function BuildPizza() {
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const { addToCart } = useContext(CartContext);
    const [popupMessage, setPopupMessage] = useState("");

    const handleIngredientChange = (ingredient) => {
        const isSelected = selectedIngredients.some(
            (item) => item.id === ingredient.id
        );

        if (isSelected) {
            setSelectedIngredients(
                selectedIngredients.filter(
                    (item) => item.id !== ingredient.id
                )
            );
        } else {
            setSelectedIngredients([
                ...selectedIngredients,
                ingredient,
            ]);
        }
    };

    const totalCost = selectedIngredients.reduce(
        (total, item) => total + Number(item.price),
        0
    );

    const handleBuildPizza = () => {
        if (selectedIngredients.length === 0) {
            setPopupMessage("Please select at least one ingredient");
            return;
        }

        const customPizza = {
            id: `custom-${Date.now()}`,
            type: "custom",
            name: "Custom Pizza",
            basePrice: 0,
            extraCost: totalCost,
            extraIngredients: selectedIngredients,
            price: totalCost,
            image: selectedIngredients[0].image,
            description: "Customized pizza created by selecting ingredients",
            ingredients: selectedIngredients.map((item) => item.tname),
            topping: selectedIngredients.map((item) => item.tname),
            quantity: 1,
        };

        addToCart(customPizza);
        setPopupMessage("Custom pizza added to cart");
        setSelectedIngredients([]);
    };

    return (
        <div className="build-container">
            <p className="build-description">
                Pizzeria now gives you options to build your own pizza.
                Customize your pizza by choosing ingredients from the list given below
            </p>

            <div className="build-table">
                {ingredients.map((ingredient) => {
                    const isChecked = selectedIngredients.some(
                        (item) => item.id === ingredient.id
                    );

                    return (
                        <div
                            className="ingredient-row"
                            key={ingredient.id}
                        >
                            <div className="ingredient-image-box">
                                <img
                                    src={ingredient.image}
                                    alt={ingredient.tname}
                                />
                            </div>

                            <div className="ingredient-info">
                                <span className="ingredient-name">
                                    {ingredient.tname}
                                </span>

                                <span className="ingredient-price">
                                    ₹{Number(ingredient.price).toFixed(2)}
                                </span>
                            </div>

                            <div className="ingredient-action">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() =>
                                        handleIngredientChange(ingredient)
                                    }
                                />

                                <span>Add</span>
                            </div>
                        </div>
                    );
                })}

                <div className="total-cost">
                    Total Cost : {totalCost}
                </div>

                <div className="build-button-box">
                    <button onClick={handleBuildPizza}>
                        Build Ur Pizza
                    </button>
                </div>
            </div>


            {popupMessage && (
                <PopupMessage
                    message={popupMessage}
                    onClose={() => setPopupMessage("")}
                />
            )}
        </div>
    );
}

export default BuildPizza;