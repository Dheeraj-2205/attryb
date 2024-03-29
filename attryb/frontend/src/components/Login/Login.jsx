import React, { useContext, useEffect, useState } from "react";
import style from "./Login.module.css";
import { Link, redirect, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContextProvider";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setCheckingError } = useContext(LoginContext);

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

      const res = await fetch(`https://attryb-project-36pd.onrender.com/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("token", data.token);
      if (data?.success === true) {
        navigate("/oemspecs");
      } else {
        setCheckingError(true);
        navigate("/signup");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={style.container}>
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
        <div>
          <Link to="/">Signup</Link>
        </div> 
      </div>
    </>
  );
};

export default Login;
