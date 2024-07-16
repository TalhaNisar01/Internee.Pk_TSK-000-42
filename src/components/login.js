import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import SignInwithGoogle from "./signInWIthGoogle";
import ClipLoader from "react-spinners/ClipLoader";
import "./Login.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      navigate("/profile");
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {loading ? (
        <div className="loader">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <h3>Login</h3>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          <p className="forgot-password text-right">
            New user <a href="/register">Register Here</a>
          </p>
          <p className="forgot-password text-right">
            <a href="/reset-password">Forgot Password?</a>
          </p>
          <SignInwithGoogle />
        </form>
      )}
    </div>
  );
}

export default Login;
