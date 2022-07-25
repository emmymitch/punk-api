import './App.scss';
import { useEffect, useState } from 'react';

import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import BeerCardsContainer from './components/BeerCardsContainer/BeerCardsContainer';

//import beersdata from "./data/beers.js";
//let beers = [];
//let filteredBeers = [];

const App = () => {
  //Set initial states
  const [searchTerm, setSearchTerm] = useState("");
  const [ABVFilter, setABVFilter] = useState(false);
  const [acidityFilter, setAcidityFilter] = useState(false);
  const [bitterFilter, setBitterFilter] = useState(false);
  const [classicFilter, setClassicFilter] = useState(false);

  const [beers, setBeers] = useState([]);
  const [filteredBeers, setFilteredBeers] = useState([]);


  //Filters function
  const checkBeerFilter = () => {

    //Check for multiple filters
    let dataChecks = [searchTerm, ABVFilter, acidityFilter, bitterFilter, classicFilter];
    
    for (let i=dataChecks.length; i>=0; i--){
      if (!dataChecks[i]){
        dataChecks.splice(i, 1);
      }
    }

    //If no or single filter active, use original beer list
    if (dataChecks.length < 1){
      setFilteredBeers(beers);
    };


    //Filters & Search
    //All separate so multiple can be applied at once
    //Also checks whether a beer actually has a property
    if (ABVFilter){
      setFilteredBeers(filteredBeers.filter((beer) => {return (beer.abv && beer.abv > 6)}));
    }

    if (acidityFilter){
      setFilteredBeers(filteredBeers.filter((beer) => {return (beer.ph && beer.ph < 4)}));
    } 

    if (bitterFilter){
      setFilteredBeers(filteredBeers.filter((beer) => {return (beer.ibu && beer.ibu > 45)}));
    } 

    if (classicFilter){
      setFilteredBeers(filteredBeers.filter((beer) => {
        const brewed = beer.first_brewed;
        const year = brewed.slice(brewed.length-4, brewed.length) //gets year off end of string
        return (beer.first_brewed && year < 2010);
      }));
    }

    if (searchTerm !== ""){
      setFilteredBeers(filteredBeers.filter((beer) => {return beer.name.toLowerCase().includes(searchTerm)}));
    }

    return;
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

  //API Fetch Request
  const getBeers = async () => {
    const response = await fetch("https://api.punkapi.com/v2/beers");
    setBeers(await response.json());
    checkBeerFilter();
  };

  //Run this func on first render only
  useEffect(() => {
    getBeers();
    checkBeerFilter();
  // eslint-disable-next-line
  }, [searchTerm, ABVFilter, acidityFilter, bitterFilter, classicFilter]);


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

      {beers && <BeerCardsContainer
        fullList={beers}
        beerList={filteredBeers}
        searchTerm={searchTerm} 
        ABVFilter={ABVFilter} 
        acidityFilter={acidityFilter} 
        bitterFilter={bitterFilter} 
        classicFilter={classicFilter}
      />}

    </div>
  );
}

export default App;
