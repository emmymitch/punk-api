import React from "react";
import "./Filter.scss";

const Filter = ({filterLabel, handleFilter}) => {
  return (
    <form className="filter-item">
      <label htmlFor="filter" className="filter-item__label">{filterLabel}</label>
      <input type="checkbox" name="filter"  onInput={handleFilter} className="filter-item__input"/>
    </form>
  );
};

export default Filter;