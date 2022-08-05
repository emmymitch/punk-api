import "./BeerCardsContainer.scss";
import BeerCard from "../BeerCard/BeerCard";

const BeerCardsContainer = ({beerList}) => {
    const cardsToShow = beerList.map((beer) => {
        return <BeerCard beer={beer} />
    });

    return(    
        <section className='cards-section'>
            {cardsToShow.length ? cardsToShow : <p className="no-beers">No beers found - check next page?</p> }
        </section>
    );
};

export default BeerCardsContainer;