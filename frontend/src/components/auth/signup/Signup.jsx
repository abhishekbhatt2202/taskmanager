import "./Signup.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/", {
        username,
        firstname,
        lastname,
        phonenumber,
        address,
        email,
        password,
      });
      console.log(response.data);
      setUsername("");
      setFirstname("");
      setLastname("");
      setPhonenumber("");
      setAddress("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const HandleClick = () => {
    navigate("/login");
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h1>Signup</h1>
        <p>Create Your Account</p>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Enter your Username"
            required
          />

          <label>First Name</label>
          <input
            type="text"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
            placeholder="Enter your First Name"
            required
          />

          <label>Last Name</label>
          <input
            type="text"
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
            placeholder="Enter your Last Name"
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            onChange={(e) => setPhonenumber(e.target.value)}
            value={phonenumber}
            placeholder="Enter your Phone Number"
            required
          />

          <label>Address</label>
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            placeholder="Enter your Address"
            required
          />

          <label>Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your Email"
            required
          />

          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter your Password"
            required
          />

          <button type="submit">Signup</button>
          <button onClick={HandleClick}>You Have Already Signup</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
