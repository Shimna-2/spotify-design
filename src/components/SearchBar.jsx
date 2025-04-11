import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../store/searchSlice";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.scss";

const SearchBar = () => {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.search.query);

  const handleChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search songs..."
        value={query}
        onChange={handleChange}
      />
      <FaSearch />
    </div>
  );
};

export default SearchBar;
