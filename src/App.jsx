import './App.scss';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';

const App = () => {
  return (
    <div className="app">
      <Header />
      <Nav />
      <div className='cards-section'></div>
    </div>
  );
}

export default App;
