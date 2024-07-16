import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes, 
  Route, 
  Navigate,
} from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/register";
import ResetPassword from "./components/ResetPassword"; 
import Profile from "./components/profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./components/firebase";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe(); // Clean up the subscription
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading state while checking authentication
  }

  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route
                path="/"
                element={user ? <Navigate to="/profile" /> : <Login />}
              />
              <Route path="/login" element={user ? <Navigate to="/profile" /> : <Login />} />
              <Route path="/register" element={user ? <Navigate to="/login" /> : <SignUp />} />
              <Route path="/profile" element={!user ? <Navigate to="/login" /> : <Profile />} />
              <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
