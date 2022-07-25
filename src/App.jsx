import './App.scss';
import { useEffect, useState } from 'react';

import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import BeerCardsContainer from './components/BeerCardsContainer/BeerCardsContainer';

import beersdata from "./data/beers.js";

const App = () => {
  //Set initial states
  const [searchTerm, setSearchTerm] = useState("");
  const [ABVFilter, setABVFilter] = useState(false);
  const [acidityFilter, setAcidityFilter] = useState(false);
  const [bitterFilter, setBitterFilter] = useState(false);
  const [classicFilter, setClassicFilter] = useState(false);
  const [beers, setBeers] = useState(beersdata); //as backup, use provided data file


  //API Fetch Request
  const getBeers = async() => {
    const response = await fetch("https://api.punkapi.com/v2/beers");
    setBeers(await response.json());
  };

  //Run these funcs on load
  useEffect(() => {
    getBeers();
    checkBeerFilter();
  });

  let filteredBeers = [...beers];


  //Filters function
  const checkBeerFilter = () => {
    //Check for multiple filters
    let checks = [searchTerm, ABVFilter, acidityFilter, bitterFilter, classicFilter];
    let activeFilters = [];

    checks.forEach((check) => {
      if (check === true){
        activeFilters.push(check);
      }
    })

    //If no filters active, use original beer list
    if (activeFilters.length <= 1){
      filteredBeers = [...beers];
    }

    //Filters & Search
    //All separate so multiple can be applied at once
    if (ABVFilter){
      filteredBeers = filteredBeers.filter((beer) => {return beer.abv > 6});
    }

    if (acidityFilter){
      filteredBeers = filteredBeers.filter((beer) => {return beer.ph < 4});
    } 

    if (bitterFilter){
      filteredBeers = filteredBeers.filter((beer) => {return beer.ibu > 45});
    } 

    if (classicFilter){
      filteredBeers = filteredBeers.filter((beer) => {
        const brewed = beer.first_brewed;
        const year = brewed.slice(brewed.length-4, brewed.length) //gets year off end of string
        return (year < 2010);
      });
    }

    if (searchTerm !== ""){
      filteredBeers = filteredBeers.filter((beer) => {return beer.name.toLowerCase().includes(searchTerm)});
    }

    return filteredBeers;
  }
  

  //Event functions
  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    checkBeerFilter();
  }

  const handleABVCheck = () => {
    setABVFilter(!ABVFilter);
    checkBeerFilter();
  }

  const handleAcidityCheck = () => {
    setAcidityFilter(!acidityFilter);
    checkBeerFilter();
  }

  const handleBitterCheck = () => {
    setBitterFilter(!bitterFilter);
    checkBeerFilter();
  }

  const handleClassicCheck = () => {
    setClassicFilter(!classicFilter);
    checkBeerFilter();
  }

  // const handleFilter = (setFilter, filter) => {
  //   setFilter(!filter);
  //   checkBeerFilter;
  // }

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
      />

      <BeerCardsContainer
        fullList={beers}
        beerList={filteredBeers}
        searchTerm={searchTerm} 
        ABVFilter={ABVFilter} 
        acidityFilter={acidityFilter} 
        bitterFilter={bitterFilter} 
        classicFilter={classicFilter}
      />

    </div>
  );
}

export default App;
