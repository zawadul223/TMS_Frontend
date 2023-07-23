import React, { useState } from 'react';
import App from '../../App';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null); // null for initial state, true for success, false for error

  function handleSubmit(e) {
    e.preventDefault();

    console.log(email, password);
    fetch('http://localhost:8080/user/login', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setLoginStatus(true);
        } else {
          setLoginStatus(false);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        // Handle additional data if needed
      })
      .catch((error) => {
        console.error(error);
        setLoginStatus(false);
      });
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3>Sign In</h3>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {loginStatus === true && 
          <div className="alert alert-success">Login successful!</div> }
          {loginStatus === false && <div className="alert alert-danger">Login failed. Please try again.</div>}

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
