import { render, screen } from "@testing-library/react";
import BeerCard from "./BeerCard";
import beersData from "../../data/beers.js";

it("Should render correct info on card", () => {
    //Gets dummy beer for render purposes
    const beer = beersData[0];
    render(<BeerCard beer={beer} />);

    const name = screen.queryByText(`Buzz`);
    const tagline = screen.queryByText(/A Real Bitter Experience/i);
    const img = screen.getByRole('img', {name: /Buzz/i});
    const abv = screen.queryByText(`4.5%`, {exact: false});
    const ph = screen.queryByText(`4.4`, {exact: false});
    const ibu = screen.queryByText(`60`, {exact: false});
    const brewDate = screen.queryByText(`09/2007`, {exact: false});
    const description = screen.queryByText("A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.");
    const foodPairs = screen.getAllByRole(`listitem`, {name: ""});

    const data = [name, tagline, img, abv, ph, ibu, brewDate, description];
    data.forEach(element => {
        expect(element).toBeInTheDocument();
    })

    expect(foodPairs.length).toBe(beer.food_pairing.length);
    foodPairs.forEach(food => {
        expect(food).toBeInTheDocument();
    })
});