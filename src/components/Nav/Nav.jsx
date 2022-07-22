import "./Nav.scss";

const Nav = (props) => {
    return(
        <div className="nav-section">
            <h2>BrewDog Punk API Nav</h2>
            <p>Search:</p>
            <input type="text"></input>
            <p>Filter:</p>
            <p>ABV, {"<"}2010, pH</p>
        </div>
    )
}

export default Nav;