import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
//import axios from 'axios'

function Login(props) {
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      setValidated(true);
    }
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const user = {
      Email: data.email,
      Password: data.password
    };
    dispatch(login(JSON.stringify(user)));
    props.updateUserLogged(data.email);
    props.handleClose();
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="login-component" noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" placeholder="email" name="email" />
              <Form.Control.Feedback type="invalid">
                Ingrese un correo v�lido.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" name="password" />
              <Form.Control.Feedback type="invalid">Ingrese su contrase�a.</Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" form="login-component" variant="primary">
          Ingresar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Login;
