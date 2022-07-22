import "./BeerCard.scss";

const BeerCard = ({beerList}) => {
    const cardsToShow = beerList.map((beer) => {

        let tagline = beer.tagline;
        if (tagline[tagline.length -1] == "."){
            tagline = tagline.slice(0, tagline.length -1);
        }
        
        return(
            <div key={beer.id} className="beer-card">
                <h1 className="beer-card__name">{beer.name}</h1>
                <div className="beer-card__scroll-section">
                    <h2 className="beer-card__tagline">{tagline}</h2>
                    <img className="beer-card__img" src={beer.image_url} alt={beer.name} />
                    <div className="beer-card__content">
                        <p>ABV: {beer.abv} | pH: {beer.ph} | IBU: {beer.ibu}</p>
                        <p>{beer.description}</p>
                        <p>{beer.food_pairing}</p>
                    </div>
                </div>
            </div>
        )
    })

    return cardsToShow;
}

export default BeerCard;