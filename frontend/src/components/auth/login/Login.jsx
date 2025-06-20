import { useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleClick = () => {
    navigate("/Signup");
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );
      console.log(response.data);
      setEmail("");
      setPassword("");
      localStorage.setItem("email", response.data.email);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="border">
        <h1>Login</h1>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={handleChange}
              value={email}
              placeholder="Enter your email"
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
              required
            />
            <button type="submit">Submit</button>
            <button onClick={handleClick}>Please Signup Now</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
