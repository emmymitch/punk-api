import "./SortBox.scss";

const SortBox = ({options, sortBy}) => {

    const optionList = options.map((option) => {
        return <option className="sort-box__option" value={option}>{option}</option>
    })

    return (
        <form className="sort-box">
            <label htmlFor="sorting"><span className="bold sort-box__label">Sort by:</span></label>
            <select className="sort-box__list" onChange={sortBy} name="sorting">
                {optionList}
            </select>
        </form>

    )
};

export default SortBox;