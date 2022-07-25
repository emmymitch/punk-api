import BeerCard from "../BeerCard/BeerCard";

const BeerCardsContainer = ({fullList, beerList, searchTerm, ABVFilter, acidityFilter, bitterFilter, classicFilter}) => {

    if(searchTerm || ABVFilter || acidityFilter || bitterFilter || classicFilter){
        return(      
            <section className='cards-section'>
                <BeerCard beerList={beerList} />
            </section>
        );

    } else{
        return(
            <section className='cards-section'>
                <BeerCard beerList={fullList} />
            </section>
        )
    }
}

export default BeerCardsContainer;