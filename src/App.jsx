import './App.scss';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import BeerCard from "./components/BeerCard/BeerCard";

import beers from "./data/beers.js";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Nav />
      <div className='cards-section cards-section__background'>
        <BeerCard beerList={beers}/>
      </div>
    </div>
  );
}

export default App;
