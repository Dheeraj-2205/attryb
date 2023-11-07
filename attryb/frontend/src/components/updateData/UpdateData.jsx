import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "./Update.module.css"
const UpdateData = () => {
  const { id } = useParams();

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
    console.log(id);

    try {
      const updateData = {
        name: state.name,
        type: state.type,
        bhp: state.bhp,
        year: state.year,
        color: state.color,
        mileage: state.mileage,
        price: state.price,
        maxSpeed: state.maxSpeed,
      };

      const res = await fetch(`https://attryb-project-36pd.onrender.com/api/v1/admin/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
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
        <h3>Update Data</h3>
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
        <Link to = "/oemspecs">
            <input type="submit" value={"Submit"} />
        </Link>
      </form>
    </div>
  );
};

export default UpdateData;
