import React from "react";
import "./SearchBox.scss";

const SearchBox = ({searchTerm, handleSearchInput}) => {
  return (
    <form className="search-box">
      <label htmlFor="search" className="search-box__label"><span className="bold">Search:</span></label>
      <input type="text" name="search" value={searchTerm} onInput={handleSearchInput} placeholder="Beer Name..." className="search-box__input"/>
    </form>
  );
};

export default SearchBox;
