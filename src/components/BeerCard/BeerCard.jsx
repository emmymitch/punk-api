import "./BeerCard.scss";

const BeerCard = ({beer}) => {

    let tagline = beer.tagline;
    if (tagline[tagline.length -1] === "."){
        tagline = tagline.slice(0, tagline.length -1);
    }
    
    const foodPairings = beer.food_pairing.map((food, index) => {
        return <li key={food}>{food}</li>;
    });


    return(
        <div key={beer.id} className="beer-card">
            <h2 className="beer-card__name">{beer.name}</h2>

            <div className="beer-card__scroll-section">
                <h3 className="beer-card__tagline">{tagline}</h3>
                <img className="beer-card__img" src={beer.image_url} alt={beer.name} />
                
                <div className="beer-card__content">
                    <p>
                        <span className="bold">ABV:</span>{beer.abv}%
                        <span className="bold">pH:</span>{beer.ph}
                        <span className="bold">IBU:</span>{beer.ibu}
                    </p>
                    <p><span className="bold">First Brewed:</span>{beer.first_brewed}</p>
                    <p>{beer.description}</p>
                    <br />
                    <div className="beer-card__content--food-pairings">
                        <p className="bold">Pair with:</p>
                        <ul>
                            {foodPairings}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BeerCard;