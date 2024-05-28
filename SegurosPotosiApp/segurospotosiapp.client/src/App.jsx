import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Login from './login/LoginComponent';
import NavBarComponent from './navbar/NavBarComponent';
import './App.css';
import Author from './pages/Author';
import Home from './pages/Home';

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
      <BrowserRouter>
        {navbar}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/authors" element={<Author />}></Route>
        </Routes>
      </BrowserRouter>
      {login}
    </Container>
  );
}

export default App;
