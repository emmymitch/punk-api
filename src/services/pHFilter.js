//This is a better pH filter as the local one currently in App only filters for the current page you're on.
//However, gaining 325 beers over 5 fetch requests is a lot of work to repeat, so has been excluded.
//This additionally is because if I were to use this, I would redo my code to use these 5 fetch requests at the beginning of App,
//then filter, search, and sort through the array of all beers using local functions. This is even somewhat preferable due to how the
//inbuilt search parameter works in the Punk API.

//Preserved here in case I do have time to redo the whole code

const pHFilter = (params, beersToRender, beersPerPage, pageNumber) => {
    params[1] = "";
    const page1 = await (await fetch(`https://api.punkapi.com/v2/beers?per_page=80&page=1${params.join("")}`)).json();
    const page2 = await (await fetch(`https://api.punkapi.com/v2/beers?per_page=80&page=2${params.join("")}`)).json();
    const page3 = await (await fetch(`https://api.punkapi.com/v2/beers?per_page=80&page=3${params.join("")}`)).json();
    const page4 = await (await fetch(`https://api.punkapi.com/v2/beers?per_page=80&page=4${params.join("")}`)).json();
    const page5 = await (await fetch(`https://api.punkapi.com/v2/beers?per_page=80&page=5${params.join("")}`)).json();

    const allBeers = [...page1];
    page2.forEach((beer) => {allBeers.push(beer)});
    page3.forEach((beer) => {allBeers.push(beer)});
    page4.forEach((beer) => {allBeers.push(beer)});
    page5.forEach((beer) => {allBeers.push(beer)});

    beersToRender = allBeers.filter((beer) => {return (beer.ph && beer.ph < ph)});

    for (let i=1; i<(beersToRender.length/pageNumber); i++){
        if (i === pageNumber){
            beersToRender = beersToRender.slice(i-1, i*beersPerPage);
        }
    }
}

export default pHFilter;