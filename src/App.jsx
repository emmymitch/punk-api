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
  const [sortDirection, setSortDirection] = useState(""); 


  //Filter event functions
  const handleSearchInput = (event) => {setSearchTerm(event.target.value.toLowerCase())}
  const handleABVCheck = () => {setABVFilter(!ABVFilter)};
  const handleAcidityCheck = () => {setAcidityFilter(!acidityFilter)};
  const handleBitterCheck = () => {setBitterFilter(!bitterFilter)};
  const handleClassicCheck = () => {setClassicFilter(!classicFilter)};
  
  const handleSort = (event) => {setSort(event.target.value)};
  const handleSortDirection = (event) => {setSortDirection(event.target.value)};

  const sortBeers = (beerArray) => {
    let sortedBeers = [...beerArray]

    if (sort === "Alphabetical"){
      sortedBeers = sortedBeers.sort((a, b) => {
        const name1 = a.name.toLowerCase();
        const name2 = b.name.toLowerCase();
        if (name1 < name2){
          return -1;
        } else if (name1 > name2){
          return 1;
        } else{
          return 0;
        };
      })
      
    } else if (sort === "First Brewed"){
      sortedBeers = sortedBeers.sort((a, b) => {
        //Convert first_brewed string into readable format for Date (YYYY, MM)
        const date1 = new Date(a.first_brewed.slice(3), a.first_brewed.slice(0, 2));
        const date2 = new Date(b.first_brewed.slice(3), b.first_brewed.slice(0, 2));
        return date1 - date2;
      })
      
    } else if (sort !== ""){
      const lowercaseSort = sort.toLowerCase();
      sortedBeers = sortedBeers.sort((a, b) => a[lowercaseSort] - b[lowercaseSort]);
    }

    return setFilteredBeers(sortedBeers)
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
      sortBeers(filteredBeers);
    }

    //By default, API gives lowest-highest
    if(sortDirection === "Highest - Lowest"){
      setFilteredBeers([...filteredBeers.reverse()]);
    }
  };

  //Run this func on first render and whenever a filter is toggled
  useEffect(() => {
    getBeers(searchTerm, 6, 4, 45, "01-2010");
  // eslint-disable-next-line
  }, [searchTerm, ABVFilter, acidityFilter, bitterFilter, classicFilter, sort, sortDirection]);


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
      />

      <BeerCardsContainer beerList={filteredBeers} />

    </div>
  );
}

export default App;
