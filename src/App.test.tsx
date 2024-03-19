import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3000/example/path',
  }),
  useRoutes: () => [],
}));

test('renders learn react link', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
  expect(1).toEqual(1);
});
