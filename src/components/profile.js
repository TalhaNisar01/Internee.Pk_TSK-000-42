import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser, faSignOutAlt, faHome } from "@fortawesome/free-solid-svg-icons";
import ClipLoader from "react-spinners/ClipLoader";
import "./Profile.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async (user) => {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      }
      setLoading(false);
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserDetails(user);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe(); // Clean up the subscription
  }, [navigate]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loader">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  if (!userDetails) {
    return <p>User not found</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={userDetails.photo || "default-photo-url"} // Add a default photo URL if needed
          alt="Profile"
          className="profile-photo"
        />
        <h3>Welcome, {userDetails.firstName || "NA"}</h3>
      </div>
      <div className="profile-info">
        <p>
          <FontAwesomeIcon icon={faEnvelope} /> Email: {userDetails.email || "NA"}
        </p>
        <p>
          <FontAwesomeIcon icon={faUser} /> First Name: {userDetails.firstName || "NA"}
        </p>
        <p>
          <FontAwesomeIcon icon={faUser} /> Last Name: {userDetails.lastName || "NA"}
        </p>
        <p>
          <FontAwesomeIcon icon={faHome} /> Address: {userDetails.address || "NA"}
        </p>
      </div>
      <button className="btn btn-primary" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
      </button>
    </div>
  );
}

export default Profile;
