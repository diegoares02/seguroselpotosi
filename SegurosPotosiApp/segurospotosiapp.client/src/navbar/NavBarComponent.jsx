import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
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
        Bienvenido {userLoginData && userLoginData.user} {logoutButton}
      </div>
    );
  const options =
    userLoginData && userLoginData.status ? (
      <Nav className="me-auto">
        <Nav.Link variant="outline-success" onClick={props.handleAuthorShow}>
          Autor
        </Nav.Link>
        <Nav.Link variant="outline-success" onClick={props.handleBookShow}>
          Libro
        </Nav.Link>
        <Nav.Link variant="outline-success" onClick={props.handleBorrowShow}>
          Prestamo
        </Nav.Link>
        <Nav.Link variant="outline-success" onClick={props.handleReturnShow}>
          Devolucion
        </Nav.Link>
      </Nav>
    ) : (
      ''
    );
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="">Seguros El Potosi</Navbar.Brand>
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
