import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { createAuthor, listAuthor } from '../redux/actions';

export default function AuthorCreate() {
  const [validated, setValidated] = useState(false);
  const formRef = useRef(null);
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
    const author = {
      authordni: data.dni,
      name: data.name,
      lastname: data.lastname
    };
    dispatch(createAuthor(JSON.stringify(author)));
    dispatch(listAuthor());
    formRef.current.reset();
  };

  return (
    <Form ref={formRef} noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="validationCustom01">
          <Form.Label>DNI</Form.Label>
          <Form.Control required type="text" name="dni" />
          <Form.Control.Feedback type="invalid">Enter author's DNI</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="validationCustom02">
          <Form.Label>Name</Form.Label>
          <Form.Control required type="text" name="name" />
          <Form.Control.Feedback type="invalid">Enter author's name</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="validationCustom02">
          <Form.Label>Lastname</Form.Label>
          <Form.Control required type="text" name="lastname" />
          <Form.Control.Feedback type="invalid">Enter author's lastname</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit">Register</Button>
    </Form>
  );
}
