import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import Login from '../login/LoginComponent';
import { store } from '../redux/store';
import { Provider } from 'react-redux';

afterEach(cleanup);

it('render App', () => {
    const updateUserLogged = jest.fn();
    const handleClose = jest.fn();
    const show = true;
  render(
    <Provider store={store}>
      <Login handleClose={handleClose} show={show} updateUserLogged={updateUserLogged} />
    </Provider>
  );
  const titleElement = screen.getByText('Login');
  expect(titleElement).toBeInTheDocument();
});