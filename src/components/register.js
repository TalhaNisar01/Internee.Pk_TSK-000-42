import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          address: address,
          photo: ""
        });
        await signOut(auth);
      }
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
      setLoading(false); 
      navigate("/login"); 
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
      });
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      {loading ? (
        <div className="loader">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <form onSubmit={handleRegister} className="register-form">
          <h3>Sign Up</h3>
          <div className="mb-3">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              onChange={(e) => setFname(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              onChange={(e) => setLname(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter address"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/login">Login</a>
          </p>
        </form>
      )}
    </div>
  );
}

export default Register;
