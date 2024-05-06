import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import App from '../App';
import { store } from '../redux/store';
import { Provider } from 'react-redux';

afterEach(cleanup);

it('render App', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const titleElement = screen.getByText('Seguros El Potosi');
  expect(titleElement).toBeInTheDocument();
});
