import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

function Login(props) {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
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

  const EmailPasswordClear = () => {
    setValidated(false);
    setEmail('');
    setPassword('');
  };

  const onEmailChange = (event) => {
    setEmail(event.currentTarget.value);
    if (email != '' && password != '') {
      setDisabled(false);
    }
  };

  const onPasswordChange = (event) => {
    setPassword(event.currentTarget.value);
    if (email != '' && password != '') {
      setDisabled(false);
    }
  };

  useEffect(() => {}, []);

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      data-testid="login-component"
      onShow={EmailPasswordClear}
    >
      <Modal.Header closeButton>
        <Modal.Title>Login Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="login-component" noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="validationCustom01">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="email@test.com"
                name="email"
                onChange={onEmailChange}
              />
              <Form.Control.Feedback type="invalid">Enter your email</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="validationCustom02">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" name="password" onChange={onPasswordChange} />
              <Form.Control.Feedback type="invalid">Enter your password</Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" form="login-component" variant="primary" disabled={disabled}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Login;
