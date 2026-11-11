import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PopupMessage from "../components/PopupMessage";
import "../styles/Auth.css";

function Login() {
  const [popupMessage, setPopupMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setPopupMessage(
        "Please fill all fields"
      );
      return;
    }

    const success = login(email, password);

    if (success) {
      setPopupMessage("Login Successful");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      setPopupMessage(
        "Invalid Email or Password"
      );
      navigate("/login")
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Login
        </button>
      </form>

      <p>
        Don't have an account?{" "}
        <Link to="/register">
          Register
        </Link>
      </p>
      {popupMessage && (
        <PopupMessage
          message={popupMessage}
          showButton={popupMessage !== "Login Successful"}
          onClose={() => setPopupMessage("")}
        />
      )}
    </div>
  );
}

export default Login;