import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = new useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:4000/login', { username, password })
      .then((response) => {
        console.log(response.data);
        navigate('/display');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={username}
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type='password'
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type='submit'>Login</button>
      </form>
      <Link to='/register'>New User?</Link>
    </div>
  );
};

export default Login;
