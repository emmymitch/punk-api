import BeerCard from "../BeerCard/BeerCard";

const BeerCardsContainer = ({beerList}) => {//, searchTerm, ABVFilter, acidityFilter, bitterFilter, classicFilter}) => {
    const cardsToShow = beerList.map((beer) => {
        return <BeerCard beer={beer} />
    });
    //if(searchTerm || ABVFilter || acidityFilter || bitterFilter || classicFilter){
    return(    
        <section className='cards-section'>
            {cardsToShow}
        </section>
    );

    // } else{
    //     return(
    //         <section className='cards-section'>
    //             <BeerCard beerList={fullList} />
    //         </section>
    //     );
    // }
};

export default BeerCardsContainer;