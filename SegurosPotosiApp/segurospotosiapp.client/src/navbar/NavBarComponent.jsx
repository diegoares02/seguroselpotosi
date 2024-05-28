import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import NavLink from './NavLink';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions';

function NavBarComponent(props) {
  const userLoginData = useSelector((state) => state.data);
  const dispatch = useDispatch(logout());
  const handleLogout = () => {
    dispatch(logout());
    location.reload();
  };
  const logoutButton = (
    <Button variant="outline-success" onClick={handleLogout}>
      {' '}
      Logout
    </Button>
  );
  const loginButton =
    userLoginData && !userLoginData.status ? (
      <Button variant="outline-success" onClick={props.handleShow}>
        Login
      </Button>
    ) : (
      <div>
        {userLoginData && userLoginData.user} {logoutButton}
      </div>
    );
  const options =
    userLoginData && userLoginData.status ? (
      <Nav className="me-auto">
        <NavLink to="/authors" href="/authors">
          Authors
        </NavLink>
        <NavLink to="/authors">Books</NavLink>
        <NavLink to="/authors">Borrows</NavLink>
        <NavLink to="/authors">Returns</NavLink>
      </Nav>
    ) : (
      ''
    );
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Seguros El Potosi</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {options}
          {loginButton}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarComponent;
