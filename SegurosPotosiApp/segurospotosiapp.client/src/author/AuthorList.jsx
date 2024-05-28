import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listAuthor } from '../redux/actions';
import Table from 'react-bootstrap/Table';

export default function AuthorList() {
  const data = useSelector((state) => state.authors);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listAuthor());
  }, []);

  const rows =
    data &&
    data.map((x, y) => (
      <tr key={y}>
        <td>{x.AuthorDNI}</td>
        <td>{x.Name}</td>
        <td>{x.Lastname}</td>
      </tr>
    ));
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>DNI</th>
            <th>Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
}
