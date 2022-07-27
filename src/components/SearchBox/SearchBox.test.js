import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from "./SearchBox";

let searchTest = "";
const TestSearch = () => {
    const changeSearch = (event) => {return searchTest += event.target.value};
    return <SearchBox searchTerm={searchTest} handleSearchInput={changeSearch} />
}

it("Should render complete correct search box", () => {
    render(<TestSearch />);

    const searchLabel = screen.getByText("Search:", {exact: false});
    const searchInput = screen.getByRole('textbox');

    expect(searchLabel).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
});

it("Should update variable with input", () => {
    render(<TestSearch />);

    const box = screen.getByRole('textbox');
    userEvent.type(box, "this is a search");

    expect(searchTest).toBe("this is a search");
})