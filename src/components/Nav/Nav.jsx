import "./Nav.scss";
import SearchBox from "../SearchBox/SearchBox";
import Filter from "../Filter/Filter";
import SortBox from "../SortBox/SortBox";

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
                nextPage}) => {

    return(
        <div className="nav-section">
            <h2>Find Your Beer</h2>
            <SearchBox label="searchBox" searchTerm={searchTerm} handleSearchInput={handleSearchInput} />

            <p className="bold">Filters:</p>
            <div className="filter-list">
                <Filter filterLabel="High Alcohol Content (ABV > 6%) "  handleFilter={handleABVCheck} />
                <Filter filterLabel="Classic Range (First brewed before 2010) " handleFilter={handleClassicCheck} />
                <Filter filterLabel="High Acidity (pH < 4) "  handleFilter={handleAcidityCheck} />
                <Filter filterLabel="Bitter (IBU > 45) "  handleFilter={handleBitterCheck} />
            </div>

            <div className="sort-list">
                <SortBox label="Sort by:" sort={sortBy} options={["", "Alphabetical", "ABV", "First Brewed", "IBU", "pH"]} />
                <SortBox label="Direction:" sort={sortDirection} options={["Lowest - Highest", "Highest - Lowest"]} />
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