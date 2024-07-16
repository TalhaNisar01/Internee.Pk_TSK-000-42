import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";

function SignInwithGoogle() {
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const user = result.user;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: "",
        });
        toast.success("User logged in successfully", {
          position: "top-center",
        });
        window.location.href = "/profile";
      }
    } catch (error) {
      console.error("Error during sign-in:", error.message);
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div>
      <p className="continue-p">--Or continue with--</p>
      <div className="google-login" onClick={googleLogin}>
        <img src={require("../google.png")} alt="Google Sign-In" />
      </div>
    </div>
  );
}

export default SignInwithGoogle;
