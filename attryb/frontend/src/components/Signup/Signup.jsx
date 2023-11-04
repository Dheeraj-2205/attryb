import React from "react";
import style from "./Signup.module.css"
import { useState } from "react";
// import { Link } from "react-router-dom";
import env from "react-dotenv"

const Signup = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

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

      const res = await fetch(`http://localhost:8000/api/v1/register`,{
        method : 'POST',
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(userData)
      })
      
      const data = await res.json();
      console.log(data);
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className={style.container}>
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
    </div>
  );
};

export default Signup;
