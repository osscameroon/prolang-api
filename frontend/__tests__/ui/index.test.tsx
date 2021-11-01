import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../pages/index';

describe('Home Page', () => {
  it('should render the full page', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /The API to browse programming languages From the beginning until today/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
