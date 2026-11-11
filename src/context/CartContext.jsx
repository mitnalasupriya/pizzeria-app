/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

function CartProvider({ children }) {
  const { currentUser } = useContext(AuthContext);

  const [cartItems, setCartItems] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);

  const cartKey = currentUser?.email
    ? `cart_${currentUser.email}`
    : "guestCart";

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setCartLoaded(false);

    const savedCart = JSON.parse(
      localStorage.getItem(cartKey)
    ) || [];

    setCartItems(savedCart);
    setCartLoaded(true);
  }, [cartKey]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!cartLoaded) return;

    localStorage.setItem(
      cartKey,
      JSON.stringify(cartItems)
    );
  }, [cartItems, cartKey, cartLoaded]);

  const addToCart = (pizza) => {
    setCartItems((prevCartItems) => {
      const itemExists = prevCartItems.find(
        (item) => item.id === pizza.id
      );

      if (itemExists) {
        return prevCartItems.map((item) =>
          item.id === pizza.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      const basePrice =
        pizza.basePrice != null
          ? Number(pizza.basePrice)
          : pizza.type === "custom"
            ? 0
            : Number(pizza.price);

      const extraCost = Number(pizza.extraCost ?? 0);

      return [
        ...prevCartItems,
        {
          ...pizza,
          basePrice,
          extraCost,
          extraIngredients: pizza.extraIngredients ?? [],
          defaultToppings:
            pizza.type === "custom"
              ? []
              : pizza.defaultToppings ?? pizza.topping ?? [],
          price: basePrice + extraCost,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (id) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevCartItems) =>
      prevCartItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== id)
    );
  };

  const updateCustomPizza = (id, updatedPizza) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updatedPizza,
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        updateCustomPizza,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;