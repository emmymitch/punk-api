import React from "react";
import "./SearchBox.scss";

const SearchBox = ({searchTerm, handleSearchInput}) => {
  return (
    <form className="search-box">
      <label htmlFor="search" className="search-box__label">Search: </label>
      <input type="text" name="search" value={searchTerm} onInput={handleSearchInput} className="search-box__input"/>
    </form>
  );
};

export default SearchBox;
