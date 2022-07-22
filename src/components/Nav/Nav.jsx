import "./Nav.scss";
import { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";

const Nav = ({beersArr, searchTerm, setSearchTerm, handleSearchInput}) => {

    // const [searchTerm, setSearchTerm] = useState("");

    // const handleInput = (event) => {
    //     setSearchTerm(event.target.value.toLowerCase());
    // }

    return(
        <div className="nav-section">
            <h2>BrewDog Punk API Nav</h2>
            
            <SearchBox label="searchBox" searchTerm={searchTerm} handleSearchInput={handleSearchInput} />

            <p>Filter:</p>
            <p>ABV, {"<"}2010, pH</p>
        </div>
    )
}

export default Nav;