import React from 'react';
import { render } from '@testing-library/react';
import Gem from './Gem';

test('renders learn react link', () => {
  const { getByText } = render(<Gem />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
