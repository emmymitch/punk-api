import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dropdown from "./Dropdown.";

let sortBoxOptions = ["option1", "option2", "option3"];
let sortBoxNumbers = [2, 6, 3, 8, 4];

const TestSortBox = () => {
    //For this test, a basic sort is defined as we are testing that it works, not a specific sort
    const testSort = () => {return sortBoxNumbers = sortBoxNumbers.sort()};
    return <Dropdown options={sortBoxOptions} sort={testSort} label="label" />
}

it("Should render complete correct sort dropdown", () => {
    render(<TestSortBox />);

    const sortLabel = screen.getByText("label", {exact: false});
    const sortInput = screen.getByRole('combobox');
    const sortOptions = screen.getAllByRole('option');

    expect(sortLabel).toBeInTheDocument();
    expect(sortInput).toBeInTheDocument();

    sortOptions.forEach((option, i) => {
        expect(option).toBeInTheDocument();
        expect(option.textContent).toBe(sortBoxOptions[i]);
    });
});

it("Should sort input on selection", () => {
    render(<TestSortBox />);

    userEvent.selectOptions(screen.getByRole('combobox'), 'option1');
    
    expect(sortBoxNumbers).toStrictEqual([2, 3, 4, 6, 8]);
});