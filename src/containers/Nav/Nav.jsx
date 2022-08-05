import "./Nav.scss";
import SearchBox from "../../components/SearchBox/SearchBox";
import Filter from "../../components/Filter/Filter";
import Dropdown from "../../components/Dropdown/Dropdown";

const Nav = ({  searchTerm,
                handleSearchInput, 
                handleABVCheck, 
                handleAcidityCheck, 
                handleBitterCheck, 
                handleClassicCheck, 
                sortBy, 
                sortDirection,
                prevPage,
                pageNumber,
                nextPage,
                changeBeersPerPage}) => {

    return(
        <div className="nav-section">
            <h2>Find Your Beer</h2>
            <Dropdown label="Results per page:" func={changeBeersPerPage} options={[5, 10, 25, 50, 80]} />
            <SearchBox label="searchBox" searchTerm={searchTerm} handleSearchInput={handleSearchInput} />
            
            <p className="bold">Filters:</p>
            <div className="filter-list">
                <Filter filterLabel="High Alcohol Content (ABV > 6%) "  handleFilter={handleABVCheck} />
                <Filter filterLabel="Classic Range (First brewed before 2010) " handleFilter={handleClassicCheck} />
                <Filter filterLabel="High Acidity (pH < 4) "  handleFilter={handleAcidityCheck} />
                <Filter filterLabel="Bitter (IBU > 45) "  handleFilter={handleBitterCheck} />
            </div>

            <div className="sort-list">
                <Dropdown label="Sort page by:" func={sortBy} options={["", "Alphabetical", "ABV", "First Brewed", "IBU", "pH"]} />
                <Dropdown label="Direction:" func={sortDirection} options={["Lowest - Highest", "Highest - Lowest"]} />
            </div>

            <div className="page">
                <button onClick={prevPage} className="bold page__button">{"<"}</button>
                <p className="bold page__number">{pageNumber}</p>
                <button onClick={nextPage} className="bold page__button">{">"}</button>
            </div>

        </div>
    )
}

export default Nav;