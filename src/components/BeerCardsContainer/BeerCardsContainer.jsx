import BeerCard from "../BeerCard/BeerCard";

const BeerCardsContainer = ({beerList}) => {
    const cardsToShow = beerList.map((beer) => {
        return <BeerCard beer={beer} />
    });
    
    return(    
        <section className='cards-section'>
            {cardsToShow}
        </section>
    );
};

export default BeerCardsContainer;