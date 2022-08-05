import './App.scss';
import { useState, useEffect } from 'react';

import Header from './containers/Header/Header';
import Nav from './containers/Nav/Nav';
import BeerCardsContainer from './containers/BeerCardsContainer/BeerCardsContainer';

import sortBeers from './services/sortBeers';


const App = () => {
  //Set initial states
  const [filteredBeers, setFilteredBeers] = useState([]);

  const [filter, setFilter] = useState({
    search: "",
    abv: false, 
    ph: false, 
    ibu: false, 
    classic: false,
    sort: "",
    sortDirection: ""
  })

  const [pagination, setPagination] = useState({pageNumber: 1, beersPerPage: 5});


  //Filter functions
  //setFilter to a copy of {filter} with the appropriate value change
  const handleSearchInput = (event) => {setFilter({...filter, search: event.target.value.toLowerCase()})};

  const handleABVCheck = () => {setFilter({...filter, abv: !filter.abv})};
  const handleAcidityCheck = () => {setFilter({...filter, ph: !filter.ph})};
  const handleBitterCheck = () => {setFilter({...filter, ibu: !filter.ibu})};
  const handleClassicCheck = () => {setFilter({...filter, classic: !filter.classic})};

  const handleSort = (event) => {setFilter({...filter, sort: event.target.value})};
  const handleSortDirection = (event) => {setFilter({...filter, sortDirection: event.target.value})};


  //Pagination functions
  const changeBeersPerPage = (event) => {setPagination({...pagination, beersPerPage: event.target.value})};
  const nextPage = () => {setPagination({...pagination, pageNumber: (pagination.pageNumber + 1)})};
  const prevPage = () => {
    if (pagination.pageNumber === 1){
      return;
    } else{
      setPagination({...pagination, pageNumber: (pagination.pageNumber - 1)});
    }
  };


  //API Fetch Request
  const getBeers = async (searchTerm, abvVal, ph, ibu, classicDate) => {
    const params = [`&per_page=${pagination.beersPerPage}`, `&page=${pagination.pageNumber}`];

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

    if(filter.sort){
      beersToRender = sortBeers(beersToRender, filter.sort);
    }

    //By default, API gives lowest-highest
    if(filter.sortDirection === "Highest - Lowest"){
      beersToRender = [...beersToRender.reverse()];
    }

    setFilteredBeers(beersToRender);
  };

  //Run this func on first render and whenever a search/filter/sort is toggled
  useEffect(() => {
    getBeers(filter.search, 6, 4, 45, "01-2010");
// eslint-disable-next-line
  },[ filter.search,
      filter.abv,
      filter.ph,
      filter.ibu,
      filter.classic,
      filter.sort,
      filter.sortDirection,
      pagination.pageNumber,
      pagination.beersPerPage
    ]);


  return (
    <div className="app">
      <Header />

      <Nav 
        searchTerm={filter.search} 
        handleSearchInput={handleSearchInput} 
        handleABVCheck={handleABVCheck} 
        handleAcidityCheck={handleAcidityCheck}
        handleBitterCheck={handleBitterCheck}
        handleClassicCheck={handleClassicCheck}
        sortBy={handleSort}
        sortDirection={handleSortDirection}
        prevPage={prevPage}
        pageNumber={pagination.pageNumber}
        nextPage={nextPage}
        changeBeersPerPage={changeBeersPerPage}
      />

      <BeerCardsContainer beerList={filteredBeers} />

    </div>
  );
}

export default App;
