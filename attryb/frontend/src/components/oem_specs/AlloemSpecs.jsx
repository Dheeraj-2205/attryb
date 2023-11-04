import React from "react";
import style from "./AlloemSpecs.module.css";
import { useState, useEffect } from "react";
const AlloemSpecs = () => {
  const [productData, setProductData] = useState({});
  const [loader, setLoader] = useState(true);
  const [search, setSearch] = useState("");

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

  useEffect(() => {
    getData();
  });

  // console.log(productData.products, "productData");

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Enter a name to search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* <button onClick={handleSearch}>Search</button> */}
      </div>
      <div className={style.container}>
        {loader
          ? "Loading..."
          : productData?.products?.map((ele) => {
              return (
                <div className="container" key={ele._id}>
                  <h3> {ele.name}</h3>
                  <p>Color :- {ele.color}</p>
                  <p>Bhp :- {ele.bhp}</p>
                  <p>High Speed :- {ele.maxSpeed}</p>
                  <p>Mileage :- {ele.mileage}</p>
                  <p>Price :- {ele.price}</p>
                  <p>Year :- {ele.year}</p>
                </div>
              );
        })}
      </div>
    </>
  );
};

export default AlloemSpecs;

// bhp
// :
// 150
// color
// :
// "blue"
// image
// :
// []
// maxSpeed
// :
// 150
// mileage
// :
// 40
// name
// :
// "Honda City"
// price
// :
// 800000
// year
// :
// 2010
// __v
// :
// 0
// _id
// :
// "6545472f10c0854fc90eb1a6"
