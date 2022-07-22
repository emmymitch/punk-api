import './App.scss';
import { useState } from 'react';

import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import BeerCard from "./components/BeerCard/BeerCard";

import beers from "./data/beers.js";


const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ABVFilter, setABVFilter] = useState(false);
  const [classicFilter, setClassicFilter] = useState(false);
  const [acidityFilter, setAcidityFilter] = useState(false);
  const [bitterFilter, setBitterFilter] = useState(false);

  let filteredBeers = [...beers];
  let noFilter = false;

  const checkBeerFilter = () => {
    noFilter = false;

    // let checks = [searchTerm, ABVFilter, acidityFilter, bitterFilter, classicFilter];
    // let activeFilters = [];
    // checks.forEach((check) => {
    //   if (check == true){
    //     activeFilters.push(check);
    //   }
    // })
    // if (activeFilters.length <= 1){
    //   filteredBeers = [...beers];
    // }

    if (ABVFilter){
      filteredBeers = filteredBeers.filter((beer) => {return beer.abv > 6});
    } else if (acidityFilter){
      filteredBeers = filteredBeers.filter((beer) => {return beer.ph < 4});
    } else if (bitterFilter){
      filteredBeers = filteredBeers.filter((beer) => {return beer.ibu > 45});
    } else if (classicFilter){
      filteredBeers = filteredBeers.filter((beer) => {
        const brewed = beer.first_brewed;
        const year = brewed.slice(brewed.length-4, brewed.length) //gets year off end of string
        return (year < 2010);
      });
    } else {
      noFilter = true;
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

  const handleABVCheck = (event) => {
    setABVFilter(!ABVFilter);
    checkBeerFilter();
  }

  const handleAcidityCheck = (event) => {
    setAcidityFilter(!acidityFilter);
    checkBeerFilter();
  }

  const handleBitterCheck = (event) => {
    setBitterFilter(!bitterFilter);
    checkBeerFilter();
  }

  const handleClassicCheck = (event) => {
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

      <div className='cards-section cards-section__background'>
        {(searchTerm || ABVFilter || acidityFilter || bitterFilter || classicFilter || noFilter) && <BeerCard beerList={filteredBeers} />}
      </div>
    </div>
  );
}

export default App;
