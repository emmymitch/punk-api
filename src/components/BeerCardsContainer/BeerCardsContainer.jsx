import BeerCard from "../BeerCard/BeerCard";
import beers from "../../data/beers";

const BeerCardsContainer = ({beerList, searchTerm, ABVFilter, acidityFilter, bitterFilter, classicFilter}) => {

    if(searchTerm || ABVFilter || acidityFilter || bitterFilter || classicFilter){
        return(      
            <section className='cards-section'>
                <BeerCard beerList={beerList} />
            </section>
        );

    } else{
        return(
            <section className='cards-section'>
                <BeerCard beerList={beers} />
            </section>
        )
    }
}

export default BeerCardsContainer;