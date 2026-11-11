import { useContext, useState, useEffect } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { saveReviewByPizzaId } from "../utils/reviewUtils";
import PopupMessage from "../components/PopupMessage";
import "../styles/OrderHistory.css";

function OrderHistory() {
  const { currentUser } = useContext(AuthContext);
  const [popupMessage, setPopupMessage] = useState("");
  const orderKey = currentUser ? `orders_${currentUser.email}` : "";
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reviewedOrders, setReviewedOrders] = useState([]);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (currentUser) {
      const savedReviews =
        JSON.parse(
          localStorage.getItem(
            `reviewedOrders_${currentUser.email}`
          )
        ) || [];

      setReviewedOrders(savedReviews);
    }
  }, [currentUser]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState({});
  const [showReviewPopup, setShowReviewPopup] = useState(false);

  const orders = currentUser
    ? JSON.parse(localStorage.getItem(orderKey)) || []
    : [];

  if (!currentUser) {
    return (
      <div className="history-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="history-container">
      <h2>Order History</h2>

      {orders.length === 0 ? (
        <h3>No Orders Found</h3>
      ) : (
        <div className="history-list">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="history-card"
            >
              <h3>{order.orderId}</h3>

              <p>Date: {order.date}</p>

              <p>Total Amount: ₹{order.total}</p>

              <h4>Items Ordered</h4>

              {order.items.map((item) => (
                <p key={item.id}>
                  {item.name} × {item.quantity}
                </p>
              ))}

              {reviewedOrders.includes(order.orderId) ? (
                <button
                  className="review-submitted-btn"
                  disabled
                >
                  Review Submitted
                </button>
              ) : (
                <button
                  className="rate-order-btn"
                  onClick={() => {
                    setSelectedOrder(order);
                    setShowReviewPopup(true);
                  }}
                >
                  Rate Order
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {showReviewPopup && selectedOrder && (
        <div className="rating-popup-overlay">
          <div className="rating-popup">

            <div className="rating-header">
              <h2>Rate Your Order</h2>
              <p className="popup-order-date">

                Order Date: {selectedOrder.date}

              </p>

              <FaTimes
                className="close-icon"
                onClick={() => {
                  setShowReviewPopup(false);
                  setSelectedOrder(null);
                }}
              />
            </div>

            {selectedOrder.items.map((item) => (
              <div
                key={item.id}
                className="popup-item"
              >

                <div className="popup-item-top">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="popup-item-img"
                  />

                  <div className="popup-item-info">
                    <h4>{item.name}</h4>

                    <p>
                      ₹{item.price} × {item.quantity}
                    </p>
                  </div>

                </div>

                <div className="star-box">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={
                        ratings[item.id] >= star
                          ? "active-star"
                          : "inactive-star"
                      }
                      onClick={() =>
                        setRatings({
                          ...ratings,
                          [item.id]: star,
                        })
                      }
                    />
                  ))}
                </div>

                <textarea
                  placeholder="Write your review"
                  value={comments[item.id] || ""}
                  onChange={(e) =>
                    setComments({
                      ...comments,
                      [item.id]: e.target.value,
                    })
                  }
                />
              </div>
            ))}

            <button
              className="submit-rating-btn"
              onClick={() => {

                selectedOrder.items.forEach((item) => {

                  const review = {
                    userName: currentUser.name,
                    rating: ratings[item.id],
                    comment: comments[item.id],
                    date: new Date().toLocaleDateString(),
                  };

                  if (
                    ratings[item.id] &&
                    comments[item.id]
                  ) {
                    saveReviewByPizzaId(
                      item.id,
                      review
                    );
                  }
                });

                const updatedReviewedOrders = [
                  ...reviewedOrders,
                  selectedOrder.orderId,
                ];

                setReviewedOrders(updatedReviewedOrders);

                localStorage.setItem(
                  `reviewedOrders_${currentUser.email}`,
                  JSON.stringify(updatedReviewedOrders)
                );

                setPopupMessage("Review Submitted");
                setTimeout(() => {
                  setPopupMessage("");
                }, 1000);
                setShowReviewPopup(false);
                setSelectedOrder(null);
              }}
            >
              Submit Rating
            </button>

          </div>
        </div>
      )}


      {popupMessage && (
        <PopupMessage
          message={popupMessage}
          showButton={popupMessage !== "Review Submitted"}
          onClose={() => setPopupMessage("")}
        />
      )}

    </div>
  );
}

export default OrderHistory;
