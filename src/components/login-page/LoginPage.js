import React, { useState } from 'react';
import './LoginPage.css'; 
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  // State to store form values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please enter both email and password.');
      return;
    }

    if (username === 'surendra reddy' && password === 'password123') {
      localStorage.setItem('username',username);
      navigate('/home');
    } else {
      alert('username or password is wrong')
    }
  };

  return (
    <div className="login-container">
      <div className='login-head'>
        <p>Login Page</p>
      </div>
      <div className='login-form-container'>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-container">
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit" className="submit-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;