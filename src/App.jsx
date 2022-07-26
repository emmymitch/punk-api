import './App.scss';
import { useEffect, useState } from 'react';

import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import BeerCardsContainer from './components/BeerCardsContainer/BeerCardsContainer';


const App = () => {
  //Set initial states
  const [filteredBeers, setFilteredBeers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [ABVFilter, setABVFilter] = useState(false);
  const [acidityFilter, setAcidityFilter] = useState(false);
  const [bitterFilter, setBitterFilter] = useState(false);
  const [classicFilter, setClassicFilter] = useState(false);


  //Filter event functions
  const handleSearchInput = (event) => {setSearchTerm(event.target.value.toLowerCase())}
  const handleABVCheck = () => {setABVFilter(!ABVFilter)};
  const handleAcidityCheck = () => {setAcidityFilter(!acidityFilter)};
  const handleBitterCheck = () => {setBitterFilter(!bitterFilter)};
  const handleClassicCheck = () => {setClassicFilter(!classicFilter)};


  //API Fetch Request
  const getBeers = async (searchTerm, abvVal, ph, ibu, classicDate) => {
    const params = [];

    //If filters on, add appropriate parameter to API request
    if (searchTerm){params.push(`&beer_name=${searchTerm}`)}
    if (ABVFilter){params.push(`&abv_gt=${abvVal}`)};
    if (bitterFilter){params.push(`&ibu_gt=${ibu}`)};
    if (classicFilter){params.push(`&brewed_before=${classicDate}`)};

    const response = await fetch(`https://api.punkapi.com/v2/beers?${params.join("")}`);
    setFilteredBeers(await response.json());

    //pH filter not available in API so manually filter results
    if (acidityFilter){
      setFilteredBeers(filteredBeers.filter((beer) => {return (beer.ph && beer.ph < ph)}));
    }
  };

  //Run this func on first render and whenever a filter is toggled
  useEffect(() => {
    getBeers(searchTerm, 6, 4, 45, "01-2010");
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

      <BeerCardsContainer beerList={filteredBeers} />

    </div>
  );
}

export default App;
