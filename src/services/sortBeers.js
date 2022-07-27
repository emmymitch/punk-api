  //Sort function
  const sortBeers = (beerArray, sortTerm) => {
    let sortedBeers = [...beerArray];

    if (sortTerm === "Alphabetical"){
      sortedBeers = sortedBeers.sort((a, b) => {
        const name1 = a.name.toLowerCase();
        const name2 = b.name.toLowerCase();
        if (name1 < name2){
          return -1;
        } else if (name1 > name2){
          return 1;
        } else{
          return 0;
        };
      })
      
    } else if (sortTerm === "First Brewed"){
      sortedBeers = sortedBeers.sort((a, b) => {
        //Convert first_brewed string into readable format for Date (YYYY, MM)
        const date1 = new Date(a.first_brewed.slice(3), a.first_brewed.slice(0, 2));
        const date2 = new Date(b.first_brewed.slice(3), b.first_brewed.slice(0, 2));
        return date1 - date2;
      })
      
    } else if (sortTerm !== ""){
      const lowercaseSort = sortTerm.toLowerCase();
      sortedBeers = sortedBeers.sort((a, b) => a[lowercaseSort] - b[lowercaseSort]);
    }

    return sortedBeers;
  }
  
export default sortBeers;