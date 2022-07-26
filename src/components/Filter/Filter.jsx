import React from "react";
import "./Filter.scss";

const Filter = ({filterLabel, handleFilter}) => {
  return (
    <form className="filter-item">
      <label htmlFor="filter" className="filter-item__label">{filterLabel} <span className="unseen">::</span></label>
      <input className="filter-item__checkbox" type="checkbox" name="filter"  onChange={handleFilter} />
    </form>
  );
};

export default Filter;
