import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Logged out successfully');
  };

  return (
    <nav>
      <ul style={{ display: 'flex', listStyleType: 'none', gap: '1rem' }}>
        <li><Link to="/">Home</Link></li>
        {!token ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/add-problem">Add Problem</Link></li>
            <li><button onClick={handleLogout} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'blue' }}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
