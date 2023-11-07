import React, { useContext, useEffect } from "react";
import style from "./Signup.module.css";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch,useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContextProvider";
import { useNavigate, Link } from "react-router-dom";


const Signup = () => {
  const { checkingError, setCheckingError } = useContext(LoginContext);

  const notify = () => toast("You Have To SignUp First");
  const navigate =  useNavigate();

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [duplicate,setDuplicate] = useState(false);

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
        name: state.name,
        email: state.email,
        password: state.password,
      };

      const res = await fetch(`https://attryb-project-oj9n.onrender.com/api/v1/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      navigate("/login")
    } catch (error) {
      console.log(error);
    }
    
  };

  useEffect(() => {
    console.log(checkingError, "checkingError");
    if (checkingError) {
      notify();
      setCheckingError(false);
    }
  }, [checkingError]);


  return (
    <div className={style.container}>
      <Toaster />
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <label> Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Your Name"
          onChange={handleInputChange}
          value={state.name}
        />
        <label> Email</label>
        <input
          type="text"
          name="email"
          placeholder="Enter Your Email"
          onChange={handleInputChange}
          value={state.email}
        />
        <label> Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          onChange={handleInputChange}
          value={state.password}
        />
        <input type="submit" />
      </form>

      
      <Link to={"/login"}>Login</Link>

    </div>
  );
};

export default Signup;
