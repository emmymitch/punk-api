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
  const [sort, setSort] = useState("");


  //Filter event functions
  const handleSearchInput = (event) => {setSearchTerm(event.target.value.toLowerCase())}
  const handleABVCheck = () => {setABVFilter(!ABVFilter)};
  const handleAcidityCheck = () => {setAcidityFilter(!acidityFilter)};
  const handleBitterCheck = () => {setBitterFilter(!bitterFilter)};
  const handleClassicCheck = () => {setClassicFilter(!classicFilter)};
  
  const handleSort = (event) => {setSort(event.target.value)};

  const sortFunction = (inputArray) => {
    let sortedBeers = [...inputArray]

    if (sort === ""){
      return setFilteredBeers(sortedBeers);

    } else if (sort === "Alphabetical"){
      sortedBeers = sortedBeers.sort((a, b) => {
        let name1 = a.name.toLowerCase();
        let name2 = b.name.toLowerCase();
        if (name1 < name2){
          return -1;
        } else if (name1 > name2){
          return 1;
        } else{
          return 0;
        };
      })
      return setFilteredBeers(sortedBeers);

    } else if (sort === "First Brewed"){
      //"MM-YYYY"
      console.log("Not just yet");
      return setFilteredBeers(sortedBeers);

    } else {
      const lowercaseSort = sort.toLowerCase();
      return setFilteredBeers(sortedBeers.sort((a, b) => a[lowercaseSort] - b[lowercaseSort]));
    }
  }


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

    if(sort){
      sortFunction(filteredBeers);
    }
  };

  //Run this func on first render and whenever a filter is toggled
  useEffect(() => {
    getBeers(searchTerm, 6, 4, 45, "01-2010");
  // eslint-disable-next-line
  }, [searchTerm, ABVFilter, acidityFilter, bitterFilter, classicFilter, sort]);


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
      />

      <BeerCardsContainer beerList={filteredBeers} />

    </div>
  );
}

export default App;
