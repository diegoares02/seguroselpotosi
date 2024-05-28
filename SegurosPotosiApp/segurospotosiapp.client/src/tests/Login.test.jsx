import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Login from '../login/LoginComponent';
import { store } from '../redux/store';
import { Provider } from 'react-redux';

afterEach(cleanup);

describe('Login tests', () => {
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

  it('Submit form successfully', () => {
    const updateUserLogged = jest.fn();
    const handleClose = jest.fn();
    const show = true;
    render(
      <Provider store={store}>
        <Login handleClose={handleClose} show={show} updateUserLogged={updateUserLogged} />
      </Provider>
    );
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'test' } });
    const submitButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(submitButton);

    //expect(updateUserLogged).toBeCalled();
    //expect(handleClose).toBeCalled();
  });
  it('Submit form failed', () => {
    const updateUserLogged = jest.fn();
    const handleClose = jest.fn();
    const show = true;

    render(
      <Provider store={store}>
        <Login handleClose={handleClose} show={show} updateUserLogged={updateUserLogged} />
      </Provider>
    );
    const submitButton = screen.getByRole('button', { name: 'Login' });
    fireEvent.click(submitButton);

    const emailErrorMessage = screen.getByText('Enter your email');
    const passwordErrorMessage = screen.getByText('Enter your password');

    expect(emailErrorMessage).toBeInTheDocument();
    expect(passwordErrorMessage).toBeInTheDocument();
  });
});
