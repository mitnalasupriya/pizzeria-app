import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/Cart.css";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PopupMessage from "../components/PopupMessage";
import { FaTrash, FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  getItemBasePrice,
  getItemExtraCost,
  getItemUnitPrice,
  getPizzaSubtotal,
  getIngredientsSubtotal,
  getCartTotal,
} from "../utils/cartUtils";

function Cart() {
  const [popupMessage, setPopupMessage] = useState("");
  const [showIngredients, setShowIngredients] = useState(false);
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);

  const pizzaSubtotal = getPizzaSubtotal(cartItems);
  const ingredientsSubtotal = getIngredientsSubtotal(cartItems);
  const totalAmount = getCartTotal(cartItems);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handleCheckout = () => {
    if (!currentUser) {
      setPopupMessage("Please login first");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }
    navigate("/checkout");
  };

  const handleClear = () => {
    clearCart();
  };

  const extraIngredientLines = cartItems.flatMap((item) =>
    (item.extraIngredients ?? []).map((ingredient) => ({
      key: `${item.id}-${ingredient.id ?? ingredient.tname}`,
      pizzaName: item.name,
      name: ingredient.tname,
      price: Number(ingredient.price),
      quantity: item.quantity,
    }))
  );

  return (
    <div className="cart-page">
      {cartItems.length === 0 ? (
        <h2 className="cart-empty">Your Cart Is Empty</h2>
      ) : (
        <div className="cart-layout">
          <section className="my-cart-section">
            <div className="my-cart-header">My Cart</div>

            <div className="cart-table">
              {cartItems.map((item) => {
                const unitBase = getItemBasePrice(item);
                const isCustom = item.type === "custom";
                const displayPrice = isCustom
                  ? getItemUnitPrice(item)
                  : unitBase;
                const lineTotal = isCustom
                  ? getItemExtraCost(item) * item.quantity
                  : unitBase * item.quantity;

                return (
                  <div key={item.id} className="cart-row">
                    <div className="cart-row-left">
                      <img src={item.image} alt={item.name} />
                      <span
                        className={`cart-type-dot ${
                          item.type === "veg"
                            ? "veg"
                            : item.type === "nonveg"
                              ? "nonveg"
                              : "custom"
                        }`}
                      />
                    </div>

                    <div className="cart-row-details">
                      <strong>{item.name}</strong>
                      <span>₹{displayPrice}</span>
                      <Link
                        to={`/customizePizza/${item.id}`}
                        className="cart-customize-link"
                      >
                        Customize
                      </Link>
                    </div>

                    <div className="cart-qty-control">
                      <button onClick={() => decreaseQuantity(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)}>+</button>
                    </div>

                    <div className="cart-line-total">
                      ₹{lineTotal.toFixed(2)}
                    </div>

                    <button
                      className="cart-delete-btn"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      <FaTrash />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="cart-subtotal-row">
              Sub Total : ₹{pizzaSubtotal.toFixed(2)}
            </div>
          </section>

          <section className="cart-summary-section">
            <div className="summary-box">
              <div className="summary-header">The total amount of</div>

              <div className="summary-row">
                <span>Pizza</span>
                <span>₹{pizzaSubtotal.toFixed(2)}</span>
              </div>

              <div
                className="summary-row summary-ingredients-row"
                onClick={() => setShowIngredients((prev) => !prev)}
              >
                <span className="summary-ingredients-label">
                  Ingredients
                  {extraIngredientLines.length > 0 &&
                    (showIngredients ? <FaChevronUp /> : <FaChevronDown />)}
                </span>
                <span>₹{ingredientsSubtotal.toFixed(2)}</span>
              </div>

              {showIngredients && extraIngredientLines.length > 0 && (
                <div className="ingredients-breakdown">
                  {extraIngredientLines.map((line) => (
                    <div className="ingredient-line" key={line.key}>
                      <span>
                        {line.name} ({line.pizzaName})
                        {line.quantity > 1 ? ` × ${line.quantity}` : ""}
                      </span>
                      <span>
                        ₹{(line.price * line.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="summary-divider" />

              <div className="summary-row summary-total-row">
                <span>Total :</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="cart-action-buttons">
              <button className="pay-btn" onClick={handleCheckout}>
                Order Now
              </button>
              <button className="clear-btn" onClick={handleClear}>
                Clear
              </button>
            </div>
          </section>
        </div>
      )}

      {popupMessage && (
        <PopupMessage
          message={popupMessage}
          showButton={popupMessage !== "Please login first"}
          onClose={() => setPopupMessage("")}
        />
      )}
    </div>
  );
}

export default Cart;
