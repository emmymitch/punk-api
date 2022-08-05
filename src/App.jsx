import './App.scss';
import { useState, useEffect } from 'react';

import Header from './containers/Header/Header';
import Nav from './containers/Nav/Nav';
import BeerCardsContainer from './containers/BeerCardsContainer/BeerCardsContainer';

import sortBeers from './services/sortBeers';


const App = () => {
  //Set initial states
  const [filteredBeers, setFilteredBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [filter, setFilter] = useState({
    abv: false, 
    ph: false, 
    ibu: false, 
    classic: false})

  const [sort, setSort] = useState("");
  const [sortDirection, setSortDirection] = useState(""); 

  const [pageNumber, setPageNumber] = useState(1);
  const [beersPerPage, setBeersPerPage] = useState(5);


  //Filter event functions
  const handleSearchInput = (event) => {setSearchTerm(event.target.value.toLowerCase())}

  const handleABVCheck = () => {setFilter({...filter, abv: !filter.abv})}
  const handleAcidityCheck = () => {setFilter({...filter, ph: !filter.ph})}
  const handleBitterCheck = () => {setFilter({...filter, ibu: !filter.ibu})}
  const handleClassicCheck = () => {setFilter({...filter, classic: !filter.classic})}

  const handleSort = (event) => {setSort(event.target.value)};
  const handleSortDirection = (event) => {setSortDirection(event.target.value)};


  //Pagination functions
  const changeBeersPerPage = (event) => {setBeersPerPage(event.target.value)};
  const nextPage = () => {setPageNumber(pageNumber + 1)};
  const prevPage = () => {
    if (pageNumber === 1){
      return;
    } else{
      setPageNumber(pageNumber - 1);
    }
  };


  //API Fetch Request
  const getBeers = async (searchTerm, abvVal, ph, ibu, classicDate) => {
    const params = [`&per_page=${beersPerPage}`, `&page=${pageNumber}`];

    //If filters on, add appropriate parameter to API request
    if (searchTerm){params.push(`&beer_name=${searchTerm}`)};
    if (filter.abv){params.push(`&abv_gt=${abvVal}`)};
    if (filter.ibu){params.push(`&ibu_gt=${ibu}`)};
    if (filter.classic){params.push(`&brewed_before=${classicDate}`)};

    const response = await fetch(`https://api.punkapi.com/v2/beers?${params.join("")}`);
    let beersToRender = await response.json();

    //pH filter not available in API so manually filter results
    if (filter.ph){
      beersToRender = beersToRender.filter((beer) => {return (beer.ph && beer.ph < ph)});
    }

    //API search matches letters, so this func checks the results for the whole string
    if (params.includes(`&beer_name=${searchTerm}`)){
      beersToRender = beersToRender.filter((beer) => {
        return beer.name.toLowerCase().includes(searchTerm.toLowerCase())
      });
    }

    if(sort){
      beersToRender = sortBeers(beersToRender, sort);
    }

    //By default, API gives lowest-highest
    if(sortDirection === "Highest - Lowest"){
      beersToRender = [...beersToRender.reverse()];
    }

    setFilteredBeers(beersToRender);
  };

  //Run this func on first render and whenever a search/filter/sort is toggled
  useEffect(() => {
    getBeers(searchTerm, 6, 4, 45, "01-2010");
// eslint-disable-next-line
  },[ searchTerm,
      sort, 
      sortDirection,
      pageNumber,
      beersPerPage,
      filter.abv,
      filter.ph,
      filter.ibu,
      filter.classic
    ]);


  return (
    <div className="app">
      <Header />

      <Nav 
        searchTerm={searchTerm} 
        handleSearchInput={handleSearchInput} 
        handleABVCheck={handleABVCheck} 
        handleAcidityCheck={handleAcidityCheck}
        handleBitterCheck={handleBitterCheck}
        handleClassicCheck={handleClassicCheck}
        sortBy={handleSort}
        sortDirection={handleSortDirection}
        prevPage={prevPage}
        pageNumber={pageNumber}
        nextPage={nextPage}
        changeBeersPerPage={changeBeersPerPage}
        filter={filter}
      />

      <BeerCardsContainer beerList={filteredBeers} />

    </div>
  );
}

export default App;
