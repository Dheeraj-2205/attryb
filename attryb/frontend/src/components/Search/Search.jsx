import React from 'react'
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const navigate = useNavigate();
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
          navigate.push(`/products/${keyword}`);
        } else {
          navigate.push("/products");
        }
    };
  return (
    <div>
        <form className="searchBox" onSubmit={searchSubmitHandler}>
            <input
            type="text"
            placeholder="Search a Product ..."
            onChange={(e) => setKeyword(e.target.value)}
            />
            <input type="submit" value="Search" />
      </form>
    </div>
  )
}

export default Search