import './App.scss';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import BeerCard from "./components/BeerCard/BeerCard";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Nav />
      <div className='cards-section cards-section__background'>
        <BeerCard />
      </div>
    </div>
  );
}

export default App;
