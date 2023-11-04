import React, { useState } from "react";
import style from "./Login.module.css";
import Loader from "../layout/Loader";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        email: state.email,
        password: state.password,
      };

      const res = await fetch(`http://localhost:8000/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      console.log(data, "line40");
      if (data?.success === true) {
        // navigate("/")
        console.log("Retrieve Data go to next page");
      } else {
        navigate("/signup");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          value={state.email}
          onChange={handleInputChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          value={state.password}
          onChange={handleInputChange}
        />
        <input type="submit" value={"Submit"} />
      </form>
    </>
  );
};

export default Login;
