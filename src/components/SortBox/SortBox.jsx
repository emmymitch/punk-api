import "./SortBox.scss";

const SortBox = ({options, sort, label}) => {

    const optionList = options.map((option) => {
        return <option key={option} className="sort-box__option" value={option}>{option}</option>
    })

    return (
        <form className="sort-box">
            <label htmlFor={label}><span className="bold sort-box__label">{label}</span></label>
            <select className="sort-box__list" onChange={sort} name={label}>
                {optionList}
            </select>
        </form>

    )
};

export default SortBox;