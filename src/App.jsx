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

    if (searchTerm != ""){
      filteredBeers = beers.filter((beer) => {return beer.name.toLowerCase().includes(searchTerm)});
    } else if (ABVFilter){
      filteredBeers = beers.filter((beer) => {return beer.abv > 6});
    } else if (classicFilter){
      filteredBeers = beers.filter((beer) => {return beer.first_brewed > 6});
    } else if (acidityFilter){
      filteredBeers = beers.filter((beer) => {return beer.ph < 4});
    } else if (bitterFilter){
      filteredBeers = beers.filter((beer) => {return beer.ibu > 45});
    } else {
      noFilter = true;
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
      />

      <div className='cards-section cards-section__background'>
        {searchTerm && <BeerCard beerList={filteredBeers}/>}
        {ABVFilter && <BeerCard beerList={filteredBeers} />}
        {acidityFilter && <BeerCard beerList={filteredBeers} />}
        {bitterFilter && <BeerCard beerList={filteredBeers} />}
        {noFilter && <BeerCard beerList={filteredBeers} />}
      </div>
    </div>
  );
}

export default App;
