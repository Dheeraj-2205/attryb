import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./CreateData.module.css"
const CreateData = () => {
    
    
  const [state, setState] = useState({
    name: "",
    type: "",
    bhp: "",
    year: "",
    color: "",
    mileage: "",
    price: "",
    maxSpeed: "",
  });

  const handleInputChange = (e) =>{
    const {name,value} = e.target;

    setState({
        ...state,
        [name] : value
    })
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newData = {
        name: state.name,
        type: state.type,
        bhp: state.bhp,
        year: state.year,
        color: state.color,
        mileage: state.mileage,
        price: state.price,
        maxSpeed: state.maxSpeed,
      };
      console.log(newData)

      const res = await fetch(`http://localhost:8000/api/v1/newoem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className= {style.container}>
      <form onSubmit={handleSubmit}>
        <h3>Create Data</h3>
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter Your Name"
          onChange={handleInputChange}
          value={state.name}
          name = "name"
        />
        <label>Color</label>
        <input
          type="text"
          placeholder="Enter Your Name"
          onChange={handleInputChange}
          value={state.color}
          name = "color"
        />
        <label>BHP</label>
        <input
          type="text"
          placeholder="Enter Your Name"
          onChange={handleInputChange}
          value={state.bhp}
          name = "bhp"
        />
        <label>High Speed</label>
        <input
          type="text"
          placeholder="Enter Your Name"
          onChange={handleInputChange}
          value={state.maxSpeed}
          name = "maxSpeed"
        />
        <label>Mileage</label>
        <input
          type="text"
          placeholder="Enter Your Name"
          onChange={handleInputChange}
          value={state.mileage}
          name= "mileage"
        />
        <label>Price</label>
        <input
          type="text"
          placeholder="Enter Your Name"
          onChange={handleInputChange}
          value={state.price}
          name="price"
        />
        <label>Year</label>
        <input
          type="text"
          placeholder="Enter Your Name"
          onChange={handleInputChange}
          value={state.year}
          name="year"
        />
        <button type = {"submit"}><Link to = "/create" >Submit</Link></button>
      </form>
    </div>
  );
};

export default CreateData;
