import { render, screen } from '@testing-library/react';
import BeerCardsContainer from "./BeerCardsContainer";
import beers from "../../data/beers.js";

it("Should render a correct small number of cards", async () => {
    render(<BeerCardsContainer beerList={beers} />);

    //Get by img instead of heading to avoid headings on rest of page
    const beerCards = screen.getAllByRole('img');

    expect(beerCards.length).toBe(beers.length);
});

it("Should render a correct large number of cards from api", async () => {
    const response = await fetch(`https://api.punkapi.com/v2/beers?per_page=48`);
    const lotsOfBeers = await response.json();

    render(<BeerCardsContainer beerList={lotsOfBeers} />);

    const lotsOfBeerCards = screen.getAllByRole('img');

    expect(lotsOfBeerCards.length).toBe(lotsOfBeers.length);
});