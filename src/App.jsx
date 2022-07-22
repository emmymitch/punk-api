import './App.scss';
import { useState } from 'react';

import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import BeerCard from "./components/BeerCard/BeerCard";

import beers from "./data/beers.js";


const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  let filteredBeers = [...beers];
  let noFilter = false;

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    checkBeerFilter();
  }

  const checkBeerFilter = () => {
    noFilter = false;

    if (searchTerm != ""){
      filteredBeers = beers.filter((beer) => {return beer.name.toLowerCase().includes(searchTerm)});
    } else {
      noFilter = true;
    }
    return filteredBeers;
  }
  
  
  checkBeerFilter();

  return (
    <div className="app">
      <Header />
      <Nav beersArr={beers} searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearchInput={handleSearchInput} />
      <div className='cards-section cards-section__background'>
        {searchTerm && <BeerCard beerList={filteredBeers}/>}
        {noFilter && <BeerCard beerList={filteredBeers} />}
      </div>
    </div>
  );
}

export default App;
