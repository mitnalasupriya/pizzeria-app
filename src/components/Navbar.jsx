import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect, useRef } from "react";
import { FaShoppingCart, FaBars, FaChevronDown } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import PopupMessage from "../components/PopupMessage";
import { getCartTotal } from "../utils/cartUtils";
import "../styles/Navbar.css";
import logo from "/PizzeriaLogo.png";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { currentUser, logout } = useContext(AuthContext);

  const [popupMessage, setPopupMessage] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = getCartTotal(cartItems);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setShowMobileMenu(false);
    setPopupMessage("Logout Successful");

    setTimeout(() => {
      setPopupMessage("");
      navigate("/");
    }, 1000);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">
          Pizzeria
        </Link>

        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>

        <Link to="/orderPizza" className="nav-link">
          Order Pizza
        </Link>

        <Link to="/buildPizza" className="nav-link">
          Build Ur Pizza
        </Link>
      </div>

      <div className="nav-right">
        <Link to="/cart" className="cart-btn">
          <FaShoppingCart className="cart-icon" />
          Cart ({cartCount}) ₹{cartTotal.toFixed(2)}
        </Link>

        <div className="desktop-auth-section" ref={userMenuRef}>
          {currentUser ? (
            <>
              <button
                className="user-menu-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                Hi, {currentUser.name}
                <FaChevronDown className="down-icon" />
              </button>

              {showUserMenu && (
                <div className="user-dropdown">
                  <Link
                    to="/orderHistory"
                    className="dropdown-link"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Orders
                  </Link>

                  <button
                    className="dropdown-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="desktop-login-options">
              <Link to="/login" className="login-btn">
                Login
              </Link>

              <Link to="/register" className="register-btn">
                Register
              </Link>
            </div>
          )}
        </div>

        <FaBars
          className="mobile-menu-icon"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        />
      </div>

      {showMobileMenu && (
        <div className="mobile-menu">
          {currentUser && (
            <div className="mobile-user-name">
              Hi, {currentUser.name}
            </div>
          )}

          <Link
            to="/"
            onClick={() => setShowMobileMenu(false)}
          >
            Home
          </Link>

          <Link
            to="/orderPizza"
            onClick={() => setShowMobileMenu(false)}
          >
            Order Pizza
          </Link>

          <Link
            to="/buildPizza"
            onClick={() => setShowMobileMenu(false)}
          >
            Build Pizza
          </Link>

          <Link
            to="/cart"
            onClick={() => setShowMobileMenu(false)}
          >
            Cart ({cartCount}) ₹{cartTotal.toFixed(2)}
          </Link>

          {currentUser ? (
            <>
              <Link
                to="/orderHistory"
                onClick={() => setShowMobileMenu(false)}
              >
                Orders
              </Link>

              <button
                className="mobile-logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setShowMobileMenu(false)}
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setShowMobileMenu(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}

      {popupMessage && (
        <PopupMessage
          message={popupMessage}
          showButton={false}
          onClose={() => setPopupMessage("")}
        />
      )}
    </nav>
  );
}

export default Navbar;