import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PopupMessage from "../components/PopupMessage";
import "../styles/Auth.css";

function Register() {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const [popupMessage, setPopupMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    //it will prevent refreshing the page when the form is submitted
    e.preventDefault();

    const {
      name,
      email,
      password,
      confirmPassword,
    } = formData;

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setPopupMessage("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setPopupMessage("Passwords do not match");
      return;
    }

    const success = register({
      name,
      email,
      password,
    });

    if (success) {
      setPopupMessage("Registration Successful");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      setPopupMessage("User already exists");
    }
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
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
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button type="submit">
          Register
        </button>
      </form>

      <p>
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>

      {popupMessage && (
        <PopupMessage
          message={popupMessage}
          showButton={popupMessage !== "Registration Successful"}
          onClose={() => setPopupMessage("")}
        />
      )}
    </div>
  );
}

export default Register;