import { cleanup, render, screen } from '@testing-library/react';
import App from "../app"

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
