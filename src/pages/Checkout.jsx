import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/Checkout.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PopupMessage from "../components/PopupMessage";
import { getCartTotal } from "../utils/cartUtils";

function Checkout() {
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { cartItems, clearCart } = useContext(CartContext);

  const totalAmount = getCartTotal(cartItems);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


const handlePlaceOrder = () => {
  // Check if cart is empty
  if (cartItems.length === 0) {
    setPopupMessage("Please select at least 1 item for order");
    return;
  }

  const {
    name,
    email,
    phone,
    address,
    city,
    state,
    pincode,
  } = formData;

  if (
    !name ||
    !email ||
    !phone ||
    !address ||
    !city ||
    !state ||
    !pincode
  ) {
    setPopupMessage("Please fill all fields");
    return;
  }

  if (!email.includes("@")) {
    setPopupMessage("Please enter a valid email");
    return;
  }

  if (phone.length !== 10) {
    setPopupMessage("Phone number must be 10 digits");
    return;
  }

  if (pincode.length !== 6) {
    setPopupMessage("Pincode must be 6 digits");
    return;
  }

  const order = {
    orderId: `ORD-${Date.now()}`,
    date: new Date().toLocaleDateString(),
    customer: formData,
    items: cartItems,
    total: totalAmount,
  };

  const orderKey = `orders_${currentUser.email}`;

  const existingOrders =
    JSON.parse(localStorage.getItem(orderKey)) || [];

  existingOrders.push(order);

  localStorage.setItem(
    orderKey,
    JSON.stringify(existingOrders)
  );

  clearCart();

  navigate("/orderSummary", {
    state: { order },
  });
};



  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          rows="4"
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
        />

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
        />
      </div>

      <div className="checkout-total">
        <h3>Total Amount : ₹{totalAmount}</h3>
      </div>

      <button
        className="place-order-btn"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>


      {popupMessage && (
        <PopupMessage
          message={popupMessage}
          onClose={() => setPopupMessage("")}
        />
      )}

    </div>
  );
}

export default Checkout;