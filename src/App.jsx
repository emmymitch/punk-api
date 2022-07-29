import './App.scss';
import { useState, useEffect } from 'react';

import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import BeerCardsContainer from './components/BeerCardsContainer/BeerCardsContainer';

import sortBeers from './services/sortBeers';


const App = () => {
  //Set initial states
  const [filteredBeers, setFilteredBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [ABVFilter, setABVFilter] = useState(false);
  const [acidityFilter, setAcidityFilter] = useState(false);
  const [bitterFilter, setBitterFilter] = useState(false);
  const [classicFilter, setClassicFilter] = useState(false);

  const [sort, setSort] = useState("");
  const [sortDirection, setSortDirection] = useState(""); 

  const [pageNumber, setPageNumber] = useState(1);
  const [beersPerPage, setBeersPerPage] = useState(5);


  //Filter event functions
  const handleSearchInput = (event) => {setSearchTerm(event.target.value.toLowerCase())}

  const handleABVCheck = () => {setABVFilter(!ABVFilter)};
  const handleAcidityCheck = () => {setAcidityFilter(!acidityFilter)};
  const handleBitterCheck = () => {setBitterFilter(!bitterFilter)};
  const handleClassicCheck = () => {setClassicFilter(!classicFilter)};
  
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
    if (ABVFilter){params.push(`&abv_gt=${abvVal}`)};
    if (bitterFilter){params.push(`&ibu_gt=${ibu}`)};
    if (classicFilter){params.push(`&brewed_before=${classicDate}`)};

    const response = await fetch(`https://api.punkapi.com/v2/beers?${params.join("")}`);
    let beersToRender = await response.json();

    //pH filter not available in API so manually filter results
    if (acidityFilter){
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
      ABVFilter, 
      acidityFilter, 
      bitterFilter, 
      classicFilter, 
      sort, 
      sortDirection,
      pageNumber,
      beersPerPage
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
      />

      <BeerCardsContainer beerList={filteredBeers} />

    </div>
  );
}

export default App;
