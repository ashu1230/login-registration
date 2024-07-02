import React from 'react';

function Home() {
  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center py-4 text-center">
      <div>
        <div className="mb-4">
          <h1>Welcome to <span className="text-primary">Quantum IT Innovation</span></h1>
        </div>
        <div className="d-flex justify-content-center">
          <a href="/login" className="btn btn-primary mx-2">Login</a>
          <a href="/register" className="btn btn-secondary mx-2">Register</a>
        </div>
      </div>
    </div>
  );
}

export default Home;
