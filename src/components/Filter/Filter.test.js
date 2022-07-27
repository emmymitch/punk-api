import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Filter from './Filter';

let testing = false;
const TestFilter = () => {
    const toggleTesting = () => {return testing = !testing};
    return <Filter filterLabel={"label"} handleFilter={toggleTesting} />
}

it("Should render complete correct checkbox filter", () => {
    render(<TestFilter />);

    const filterLabel = screen.getByText("label", {exact: false});
    const filterToggle = screen.getByRole('checkbox');

    expect(filterLabel).toBeInTheDocument();
    expect(filterToggle).toBeInTheDocument();
});

it("Should toggle on/off", () => {
    render(<TestFilter />);

    userEvent.click(screen.getByRole('checkbox'));

    expect(testing).toBeTruthy();
})