import { cleanup, render, screen } from '@testing-library/react';
import React from 'react';

import App from "../app"

/* global
afterEach
test
expect
it
*/
afterEach(cleanup);

test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});

it('it should take snap', () => {
    const { asFragment } = render(<App />)
    expect(asFragment(<App />)).toMatchSnapshot();
})
