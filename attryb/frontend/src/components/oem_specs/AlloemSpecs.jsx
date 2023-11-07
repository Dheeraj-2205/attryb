import React from "react";
import style from "./AlloemSpecs.module.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import Slider from "@mui/material/Slider"







const AlloemSpecs = ({role}) => {



  const [productData, setProductData] = useState({});
  const [loader, setLoader] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const retrieveToken = localStorage.getItem("token");
  const [price,setPrice] = useState([200000,2000000]);



  const priceHandler =(event ,newPrice) =>{
    setPrice(newPrice);
  }



  const navigate = useNavigate();
  const notify = () => toast.success('Logout SuccessFully');
  
  const retrieveData = localStorage.getItem("role");

  const getData = async () => {
    try {
      let trimmedSearch = search.trim();
      
        const res = await fetch(
          `https://attryb-project-oj9n.onrender.com/api/v1/alloem?q=${trimmedSearch}&price[gte]=${price[0]}&price[lte]=${price[1]}`
        );
        const data = await res.json();
        setProductData(data);
        setLoader(false);
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
    await fetch(`https://attryb-project-oj9n.onrender.com/api/v1/admin/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${retrieveToken}`,
        "Content-Type": "application/json",
      },
    });
  };

  const  logout = async() =>{
    notify();
    navigate("/login");
  }


  useEffect(() => {
    getData();
  });



  return (
    <>
    <Toaster/>
      <div className={style.search}>
        <input
          type="text"
          placeholder="Enter a name to search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {role === "admin" ? (
          
            <Link to="/create"><button>Create</button></Link>
          
        ) : (
          ""
        )}
        <Link to = "/login"><button onClick={logout}>Logout</button></Link>
        {/* <button onClick={handleSearch}>Search</button> */}
      </div>
      <div className={style.filtervalue}>
        <Slider
          value = {price}
          onChange={priceHandler}
          valueLabelDisplay = "auto"
          min = {200000}
          max = {2000000}
        />
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
                  {retrieveData === "admin" ? (
                    <button className={style.adminUpdate}>
                      <Link to={`/update/${ele._id}`}>Edit</Link>
                    </button>
                  ) : (
                    ""
                  )}
                  {retrieveData === "admin" ? (
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
