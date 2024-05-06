import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Login from './login/LoginComponent';
import NavBarComponent from './navbar/NavBarComponent';

function App() {
  const [show, setShow] = useState(false);
  const [emailUser, setEmailUser] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const updateUserLogged = (user) => setEmailUser(user);

  const navbar = <NavBarComponent handleShow={handleShow} emailUser={emailUser}></NavBarComponent>;
  const login = (
    <Login handleClose={handleClose} show={show} updateUserLogged={updateUserLogged}></Login>
  );

  return (
    <Container fluid>
      {navbar}
      {login}
    </Container>
  );
}

export default App;
