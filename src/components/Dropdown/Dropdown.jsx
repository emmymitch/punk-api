import "./Dropdown.scss";

const Dropdown = ({options, func, label}) => {

    const optionList = options.map((option) => {
        return <option key={option} className="sort-box__option" value={option}>{option}</option>
    })

    return (
        <form className="sort-box">
            <label className="sort-box__label" htmlFor={label}><span className="bold">{label}</span></label>
            <select className="sort-box__list" onChange={func} name={label}>
                {optionList}
            </select>
        </form>

    )
};

export default Dropdown;