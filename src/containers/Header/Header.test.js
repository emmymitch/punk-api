import { render, screen } from '@testing-library/react';
import Header from "./Header";

it('Should render header', () => {
    render(<Header />);
    const header = screen.getByRole('heading', {name: /BrewDog Back Catalogue/i});
    expect(header).toBeInTheDocument();
  });