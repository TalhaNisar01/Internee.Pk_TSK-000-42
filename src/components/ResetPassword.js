import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import "./ResetPassword.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent successfully!", {
        position: "top-center",
      });
      navigate("/login");
    } catch (error) {
      console.error("Error sending password reset email:", error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      {loading ? (
        <div className="loader">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <form onSubmit={handleResetPassword} className="reset-password-form">
          <h3>Reset Password</h3>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Send Reset Email
            </button>
          </div>
          <p className="back-to-login text-right">
            <a href="/login">Back to Login</a>
          </p>
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
