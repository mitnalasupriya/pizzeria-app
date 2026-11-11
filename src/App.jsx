import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import OrderPizza from "./pages/OrderPizza";
import BuildPizza from "./pages/BuildPizza";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSummary from "./pages/OrderSummary";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import OrderHistory from "./pages/OrderHistory";
import CustomizePizza from "./pages/CustomizePizza";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orderPizza" element={<OrderPizza />} />
          <Route path="/buildPizza" element={<BuildPizza />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route path="/orderSummary" element={<OrderSummary />} />
          <Route
            path="/orderHistory"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customizePizza/:id"
            element={<CustomizePizza />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;