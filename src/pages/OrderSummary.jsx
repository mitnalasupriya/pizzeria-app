import { useLocation, Link } from "react-router-dom";
import "../styles/OrderSummary.css";

function OrderSummary() {
  const { state } = useLocation();

  if (!state?.order) {
    return <h2>No Order Found</h2>;
  }

  const { order } = state;

  return (
    <div className="summary-container">
      <h2>Order Placed Successfully </h2>

      <div className="summary-card">

        <div className="summary-row">
          <span>Order ID</span>
          <span>{order.orderId}</span>
        </div>

        <div className="summary-row">
          <span>Date</span>
          <span>{order.date}</span>
        </div>

        <div className="summary-row">
          <span>Name</span>
          <span>{order.customer.name}</span>
        </div>

        <div className="summary-row">
          <span>Email</span>
          <span>{order.customer.email}</span>
        </div>

        <h3>Items Ordered</h3>

        {order.items.map((item) => (
          <div className="summary-row" key={item.id}>
            <span>{item.name}</span>
            <span>× {item.quantity}</span>
          </div>
        ))}

        <div className="summary-row total-row">
          <span>Total Amount</span>
          <span>₹{order.total}</span>
        </div>

        <Link to="/orderHistory">
          <button>View Order History</button>
        </Link>

      </div>
    </div>
  );
}

export default OrderSummary;