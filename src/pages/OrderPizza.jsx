import pizzas from "../data/pizza.json";
import PizzaCard from "../components/PizzaCard";
import "../styles/OrderPizza.css";

function OrderPizza() {
  return (
    <div className="order-container">
      {pizzas.map((pizza) => (
        <PizzaCard key={pizza.id} pizza={pizza} />
      ))}
    </div>
  );
}

export default OrderPizza;