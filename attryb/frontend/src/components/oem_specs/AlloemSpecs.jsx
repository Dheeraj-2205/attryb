import React from "react";
import style from "./AlloemSpecs.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const AlloemSpecs = () => {
  const [productData, setProductData] = useState({});
  const [loader, setLoader] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const retrieveToken = localStorage.getItem("token");

  const getData = async () => {
    try {
      if (search) {
        const res = await fetch(
          `http://localhost:8000/api/v1/alloem?q=${search}`
        );
        const data = await res.json();
        setProductData(data);
        setLoader(false);
      } else {
        const res = await fetch(`http://localhost:8000/api/v1/alloem`);
        const data = await res.json();
        setProductData(data);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };
  const filterByColor = () => {
    const filterData = productData.products.filter(
      (ele) => ele.color.toLowerCase() === filterValue.toLowerCase()
    );
    setFilteredData(filterData);
  };

  // delete Part

  const deleteTheData = async (id) => {
    console.log(id);
    await fetch(`http://localhost:8000/api/v1/admin/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${retrieveToken}`,
        "Content-Type": "application/json",
      },
    });
  };

  const  logoutUser = async() =>{
    const res = await fetch(`http://localhost:8000/api/v1/logout`,{
      method : "GET",
      headers : {
        "Content-Type" : "application/json"
      }
    });
    const data = await res.json();
    
  }


  useEffect(() => {
    getData();
  });

  const localData = localStorage.getItem("role");

  return (
    <>
      <div className={style.search}>
        <input
          type="text"
          placeholder="Enter a name to search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {localData === "admin" ? (
          
            <Link to="/create"><button>Create</button></Link>
          
        ) : (
          ""
        )}
        <Link to = "/login"><button onClick={logoutUser}>Logout</button></Link>
        {/* <button onClick={handleSearch}>Search</button> */}
      </div>
      <div>
        <input
          type="text"
          onChange={(e) => setFilterValue(e.target.value)}
          value={filterValue}
          placeholder="Filter By Color"
        />
        <button onClick={filterByColor}>Color</button>
      </div>
      <div className={style.container}>
        {loader
          ? "Loading..."
          : (filteredData.length > 0
              ? filteredData
              : productData?.products
            )?.map((ele) => {
              return (
                <div key={ele._id}>
                  <h3>Name :- {ele.name}</h3>
                  <p>Color :- {ele.color}</p>
                  <p>Bhp :- {ele.bhp}</p>
                  <p>High Speed :- {ele.maxSpeed}</p>
                  <p>Mileage :- {ele.mileage}</p>
                  <p>Price :- {ele.price}</p>
                  <p>Year :- {ele.year}</p>
                  {localData === "admin" ? (
                    <button className={style.adminUpdate}>
                      <Link to={`/update/${ele._id}`}>Edit</Link>
                    </button>
                  ) : (
                    ""
                  )}
                  {localData === "admin" ? (
                    <button className={style.adminUpdate} onClick={deleteTheData.bind(null, ele._id)}>
                      Delete
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
      </div>
    </>
  );
};

export default AlloemSpecs;
