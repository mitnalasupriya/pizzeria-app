import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { FaPlus, FaMinus } from "react-icons/fa";

import ReviewModal from "./ReviewModal";
import {
    getAverageRating,
    getStars,
    getReviewsByPizzaId,
} from "../utils/reviewUtils";

function PizzaCard({ pizza }) {
    //console.log(pizza.image)
    const {
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
    } = useContext(CartContext);

    const cartItem = cartItems.find(
        (item) => item.id === pizza.id
    );
    const [showReviews, setShowReviews] = useState(false);

    const averageRating = getAverageRating(pizza.id);
    const reviews = getReviewsByPizzaId(pizza.id);

    return (
        <div className="pizza-card">
            <div className="pizza-info">

                <div className="pizza-left">
                    <h2>{pizza.name}</h2>

                    <div
                        className={`type-box ${pizza.type === "veg" ? "veg" : "nonveg"
                            }`}
                    />

                    <h3>₹{pizza.price}.00</h3>
                    <div className="pizza-rating">
                        <span>
                            {averageRating > 0
                                ? getStars(Math.round(averageRating))
                                : "☆☆☆☆☆"}
                        </span>

                        <span>
                            {averageRating > 0
                                ? `${averageRating} (${reviews.length})`
                                : "No ratings"}
                        </span>
                        <button
                            className="view-review-btn"
                            onClick={() => setShowReviews(true)}
                        >
                            View Reviews
                        </button>
                    </div>

                </div>

                <div className="pizza-middle">
                    <p>{pizza.description}</p>

                    <p>
                        <strong>Ingredients :</strong>{" "}
                        {pizza.ingredients.join(", ")}
                    </p>

                    <p>
                        <strong>Toppings :</strong>{" "}
                        {pizza.topping.join(", ")}
                    </p>


                </div>

                <div className="pizza-right">
                    <img src={pizza.image} alt={pizza.name} />

                    {cartItem ? (
                        <div className="quantity-box">
                            <button
                                onClick={() => decreaseQuantity(pizza.id)}
                            >
                                <FaMinus />
                            </button>

                            <span>{cartItem.quantity}</span>

                            <button
                                onClick={() => increaseQuantity(pizza.id)}
                            >
                                <FaPlus />
                            </button>
                        </div>
                    ) : (
                        <button onClick={() => addToCart(pizza)}>
                            Add To Cart
                        </button>
                    )}
                </div>

            </div>

            {showReviews && (
                <ReviewModal
                    pizza={pizza}
                    onClose={() => setShowReviews(false)}
                />
            )}
        </div>
    );
}

export default PizzaCard;