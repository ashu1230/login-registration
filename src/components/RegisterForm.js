import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !dateOfBirth || !email || !password) {
      setError('All fields are required.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/register', { name, dateOfBirth, email, password });
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setError('');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <MDBContainer fluid className='p-4'>
      <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            IT services that vow your
            <span className="text-primary">success</span>
          </h1>
          <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
            Quantum wants you to feel comfortable with what we’re planning to make the right choice for your business. We have been in this business since and our experts have gained a lot from working with hundreds of clients all over the world.
          </p>
          <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}> 
            You definitely need a digital marketing agency to help your product and services to sell online. Quantum understands your need and accordingly. Our experts will help you with marketing research, web design planning, data analytics, content strategy. We assure you to get customers on your website and want to stay.
          </p>
        </MDBCol>

        <MDBCol md='4'>
          <MDBCard className='my-4'>
            <MDBCardBody className='p-4'>
              <h2 className="text-center mb-3">Register</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <form onSubmit={handleRegister}>
                <MDBInput
                  wrapperClass='mb-3'
                  label='Name'
                  id='form1'
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <MDBInput
                  wrapperClass='mb-3'
                  label='Date of Birth'
                  id='form2'
                  type='date'
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
                <MDBInput
                  wrapperClass='mb-3'
                  label='Email'
                  id='form3'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MDBInput
                  wrapperClass='mb-3'
                  label='Password'
                  id='form4'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <MDBBtn type="submit" className='w-100 mb-3' size='md'>
                  Register
                </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default RegisterForm;
