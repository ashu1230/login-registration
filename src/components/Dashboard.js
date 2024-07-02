import React, { useState, useEffect } from 'react';
import { Table, Spinner, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCog, FaTimes } from 'react-icons/fa';
import Avatar from 'react-avatar';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize with true to show loading initially
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: { 'Authorization': token }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setError('Failed to fetch users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const token = localStorage.getItem('token');
    if (!token || !user) {
      navigate('/login');
    } else {
      fetchUsers();
    }
  }, [navigate, user]);

  if (!user) return null;

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h2>Welcome, <span className="text-primary">{user.name}</span></h2>
        </Col>
      </Row>
      <Row>
        <Col>
          {loading ? (
            <div className="text-center my-4">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          ) : error ? (
            <Alert variant="danger" className="text-center my-4">
              {error}
            </Alert>
          ) : (
            <Table hover responsive className="table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Date Created</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td style={{ color: 'gray' }}>{index + 1}</td>
                    <td style={{ color: 'gray' }}>
                      <Avatar name={user.name} size="30" round="50px" style={{ marginRight: '10px' }} />
                      {user.name}
                    </td>
                    <td style={{ color: 'gray' }}>{new Date(user.dateOfBirth).toLocaleDateString()}</td>
                    <td style={{ color: 'gray' }}><span>Loading..</span></td>
                    <td className={user.active === user.name ? 'text-success' : 'text-danger'}>
                      {user.active === user.name ? 'Active' : 'Inactive'}
                    </td>
                    <td>
                      <FaCog className="text-primary mr-3" style={{ cursor: 'pointer', marginRight: '20px' }} />
                      <FaTimes className="text-danger" style={{ cursor: 'pointer' }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
