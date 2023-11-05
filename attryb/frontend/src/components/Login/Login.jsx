import React, { useContext, useEffect, useState } from "react";
import style from "./Login.module.css";
import { redirect, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/User";
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const  user  = useSelector((state)=> state.user);
  console.log(user)

  // const loginHandler = (e) => {
  //   e.preventDefault();
  //   dispatch(loginUser(email, password));
  // };

  // const navigate = useNavigate();
  // const { setCheckingError } = useContext(LoginContext);

  // const [state, setState] = useState({
  //   email: "",
  //   password: "",
  // });
  // const [error, setError] = useState(false);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;

  //   setState({
  //     ...state,
  //     [name]: value,
  //   });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const userData = {
  //       email: state.email,
  //       password: state.password,
  //     };

  //     const res = await fetch(`http://localhost:8000/api/v1/login`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(userData),
  //     });
  //     const data = await res.json();
  //     localStorage.setItem("role", data.user.role);
  //     localStorage.setItem("token", data.token);
  //     if (data?.success === true) {
  //       navigate("/oemspecs");
  //       console.log("Retrieve Data go to next page");
  //     } else {
  //       setCheckingError(true);
  //       navigate("/signup");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));

    if(!user.isAuthenticated){
      alert(`wrong credentials`)
    }
    
  };



  

  return (
    <>
      <div className={style.container}>
        <form onSubmit={handleSubmit}>
          {/* <label>Email</label>
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
          <input type="submit" value={"Submit"} /> */}

          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
