import { render, screen } from '@testing-library/react';
import Nav from "./Nav";

it('Should render all items', () => {
    render(<Nav />);
  
    const heading = screen.getByRole('heading', {name: /Find Your Beer/i});
    const searchBox = screen.getByRole('textbox');
    const filterHeading = screen.queryByText(/Filters:/i);
    const filters = screen.getAllByRole('checkbox');
    const sortBoxes = screen.getAllByRole('combobox');
    const sortOptions = screen.getAllByRole('option');
  
    expect(heading).toBeInTheDocument();
    expect(searchBox).toBeInTheDocument();
    expect(filterHeading).toBeInTheDocument();
  
    filters.forEach(filter => {
      expect(filter).toBeInTheDocument();
    })
  
    sortBoxes.forEach(box => {
      expect(box).toBeInTheDocument();
    })
  
    sortOptions.forEach(option => {
      expect(option).toBeInTheDocument();
    })
  
  });