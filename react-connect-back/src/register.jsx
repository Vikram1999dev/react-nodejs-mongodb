import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rollno, setRollno] = useState('');
  const [gender, setGender] = useState('');
  const navigate = new useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = { username, password, rollno, gender };
    axios
      .post('http://localhost:4000/register', user)
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
        <input
          type='number'
          value={rollno}
          placeholder='Roll no'
          onChange={(e) => setRollno(e.target.value)}
        />
        <br />
        <input
          type='text'
          value={gender}
          placeholder='Gender'
          onChange={(e) => setGender(e.target.value)}
        />
        <br />
        <button type='submit'>Register</button>
      </form>
      <Link to='/'>Already a user</Link>
    </div>
  );
};

export default Register;
