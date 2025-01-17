import React, { useState } from 'react';
import { registerUser } from '../services/api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    setSuccess(''); // Clear any previous success messages

    try {
      await registerUser({ username, password });
      setSuccess('Registration successful! You can now login.');
      setUsername('');
      setPassword('');
      setTimeout(() => {
        window.location.href = '/login'; // Redirect to login page
      }, 2000); // Optional delay for better UX
    } catch (err) {
      setError(
        err.response?.data?.message || 'Error during registration. Please try again.'
      );
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
