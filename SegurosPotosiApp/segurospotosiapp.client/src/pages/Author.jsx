import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import AuthorList from '../author/AuthorList';
import AuthorCreate from '../author/AuthorCreate';
import { Container } from 'react-bootstrap';
export default function Author() {
  return (
    <>
      <Container fluid>
        <h1>Author</h1>
        <Row>
          <Col>
            <AuthorCreate />
          </Col>
          <Col>
            <AuthorList />
          </Col>
        </Row>
      </Container>
    </>
  );
}
