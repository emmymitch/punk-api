# Brewdog Beers Punk API - Emily Mitcheson-Smith
Live site: <a href="https://emmymitch.github.io/punk-api">emmymitch.github.io/punk-api</a>

React, SCSS, JS, HTML, RTL

#
## Functionality
- Choose how many results to show on the page
- Search the Punk API for your chosen beer
- Filters by:
    - ABV
    - Original brew date
    - pH
    - IBU
- Sort the results by any of the above, or alphabetically

#
## React
This app was built in React as part of the _nology bootcamp. Components were built in JS, styled with SCSS, and tested with the React Testing Library. 

States were used along with the useEffect hook to keep track of what filters/search/sort were active, along with the page number.

The API was reached with an asynchronous function with the parameters defined by their individual states.

#
## Styling
The main site layout is in grid format, with the majority of internal styling in flexbox layout.

BEM classes were used throughout the project.

Style variations were also used for the card scrollbars to account for different browser compatibilities.