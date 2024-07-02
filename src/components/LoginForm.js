import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox
} from 'mdb-react-ui-kit';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('All fields must be filled out');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success('Login successful');
      navigate('/dashboard');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        toast.error('Invalid email or password');
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <MDBContainer className='my-5'>
      <MDBCard>
        <MDBRow className='g-0 d-flex align-items-center'>
          <MDBCol md='6'>
            <MDBCardImage src='https://stacks.rocks/site/templates/assets-old/images/user/login.svg' alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
          </MDBCol>
          <MDBCol md='4'>
            <MDBCardBody>
              <h2 className="text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <MDBInput 
                  wrapperClass='mb-4' 
                  label='Email address' 
                  id='form1' 
                  type='email' 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                />
                <MDBInput 
                  wrapperClass='mb-4' 
                  label='Password' 
                  id='form2' 
                  type='password' 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <div className="d-flex justify-content-between mx-4 mb-4">
                  <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                  <a href="/register">Register</a>
                </div>
                <MDBBtn className="mb-4 w-100" type="submit">Sign in</MDBBtn>
              </form>
              <ToastContainer />
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default LoginForm;
