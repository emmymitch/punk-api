import "./Nav.scss";
import { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import Filter from "../Filter/Filter";

const Nav = ({searchTerm, handleSearchInput, handleABVCheck, handleAcidityCheck, handleBitterCheck}) => {

    return(
        <div className="nav-section">
            <h2>Find Your Beer</h2>
            
            <SearchBox label="searchBox" searchTerm={searchTerm} handleSearchInput={handleSearchInput} />

            <p>Filters:</p>
            <Filter filterLabel="High Alcohol Content (ABV > 6%) "  handleFilter={handleABVCheck} />
            {/* <Filter filterLabel="Classic Range (First brewed before 2010) " handleFilter={handleFilter} /> */}
            <Filter filterLabel="High Acidity (pH < 4) "  handleFilter={handleAcidityCheck} />
            <Filter filterLabel="Bitter (IBU > 45) "  handleFilter={handleBitterCheck} />
        </div>
    )
}

export default Nav;