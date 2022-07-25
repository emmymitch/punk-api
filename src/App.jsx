import './App.scss';
import { useState } from 'react';

import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import BeerCardsContainer from './components/BeerCardsContainer/BeerCardsContainer';

import beers from "./data/beers.js";
let filteredBeers = [...beers];

const App = () => {
  //Set initial states
  const [searchTerm, setSearchTerm] = useState("");
  const [ABVFilter, setABVFilter] = useState(false);
  const [acidityFilter, setAcidityFilter] = useState(false);
  const [bitterFilter, setBitterFilter] = useState(false);
  const [classicFilter, setClassicFilter] = useState(false);
 

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

  
  checkBeerFilter();

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
