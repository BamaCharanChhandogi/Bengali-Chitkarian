import React, { useState } from "react";
import SignUp from "./SignUp";
import { auth } from "../firebase";
function Login() {
  const [isSignUp, setIsSignUpVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckBox] = useState(false);

  const login = (e) => {
    e.preventDefault();
    if (!checkbox) {
      alert("Please accept the terms and conditions to continue");
      return;
    }
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          setEmail("");
          setPassword("");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  const handleCheckBox = () => {
    setCheckBox(!checkbox);
  };
  return (
    <>
      {!isSignUp ? (
        <div className="flex justify-center mt-10">
          <div className="bg-white border border-gray-300 rounded-lg w-80 max-w-screen-lg sm:w-96 p-6">
            <h2 className="text-xl font-bold text-blue-gray mb-1">Sign In</h2>
            <p className="text-gray font-normal mb-2">
              Nice to meet you! Enter your details to see your friends.
            </p>
            <form className="mt-6 mb-2">
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="text-blue-gray font-medium block mb-1"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-70 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="text-blue-gray font-medium block mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-70 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <label className="block mb-3">
                <input
                  type="checkbox"
                  className="mr-2"
                  required
                  value={checkbox}
                  onClick={handleCheckBox}
                />
                <span className="text-gray font-normal">
                  I agree the{" "}
                  <button className="font-medium text-blue-gray hover:text-gray-900 cursor-pointer">
                    Terms and Conditions
                  </button>
                </span>
              </label>
              <button
                className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
                onClick={login}
              >
                Sign In
              </button>
              <p className="mt-4 text-gray text-center font-normal">
                Don't have an account?{" "}
                <button
                  className="font-medium text-gray-900 cursor-pointer"
                  onClick={() => setIsSignUpVisible(true)}
                >
                  Sign Up
                </button>
              </p>
            </form>
          </div>
        </div>
      ) : (
        <SignUp />
      )}
    </>
  );
}

export default Login;
