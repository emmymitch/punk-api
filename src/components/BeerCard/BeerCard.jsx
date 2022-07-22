import "./BeerCard.scss";

const BeerCard = ({beerList}) => {
    const cardsToShow = beerList.map((beer) => {

        let tagline = beer.tagline;
        if (tagline[tagline.length -1] == "."){
            tagline = tagline.slice(0, tagline.length -1);
        }
        
        const foodPairings = beer.food_pairing.map((food) => {
            return <li>{food}</li>;
        });


        return(
            <div key={beer.id} className="beer-card">
                <h1 className="beer-card__name">{beer.name}</h1>

                <div className="beer-card__scroll-section">
                    <h2 className="beer-card__tagline">{tagline}</h2>
                    <img className="beer-card__img" src={beer.image_url} alt={beer.name} />
                    
                    <div className="beer-card__content">
                        <p>ABV: {beer.abv} | pH: {beer.ph} | IBU: {beer.ibu}</p>
                        <p>{beer.description}</p>
                        <br />
                        <div className="beer-card__content--food-pairings">
                            <p>Pair with:</p>
                            <ul>
                                {foodPairings}
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        )
    })

    return cardsToShow;
}

export default BeerCard;