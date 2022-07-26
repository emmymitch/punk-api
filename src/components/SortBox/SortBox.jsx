
const SortBox = ({options, sortBy}) => {

    const optionList = options.map((option) => {
        return <option value={option}>{option}</option>
    })

    return (
        <>
            <label htmlFor="sorting"><span className="bold">Sort by:</span></label>
            <select onChange={sortBy} name="sorting">
                {optionList}
            </select>
        </>

    )
};

export default SortBox;