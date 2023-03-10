import React, { useState } from "react";
import { useAuth } from "./AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import "./Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (password !== passConfirm) {
      return setError("Passwords do not match");
    }
    setError("");
    setLoading(true);
    signup(auth, email, password)
      .then((res) => {
        navigate("/updateprofile");
      })
      .catch((err) => {
        setError("Failed to create an account");
      });

    setLoading(false);
  }

  return (
    <main className="signup_main">
      <h1>Sign up</h1>
      <p>Create an account below.</p>
      <section>
        {error && <p className="login_error">{error}</p>}
        <form id="signup_form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="signup_label" htmlFor="email">
              Email
            </label>
            <input className="login_input"
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div className="input-group">
            <label className="signup_label" htmlFor="password">
              Password
            </label>
            <input
            className="login_input"
              id="password"
              type="passowrd"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          <div className="input-group">
            <label className="signup_label" htmlFor="passconfirm">
              Confirm Password
            </label>
            <input
            className="login_input"
              id="passconfirm"
              type="text"
              value={passConfirm}
              onChange={(e) => {
                setPassConfirm(e.target.value);
              }}
            ></input>
          </div>
          <button id="signup_submit" type="submit">
            Submit
          </button>
        </form>
      </section>
      <p className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </main>
  );
}

export default Signup;
