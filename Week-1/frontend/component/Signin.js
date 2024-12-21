import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context'; // Adjust path as needed
import './common.css'; // Import your CSS file

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/signin', { // Replace with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Sign-in failed' }));
        throw new Error(errorData.message || 'Sign-in failed');
      }

      const { token } = await response.json();
      login(token); // Call the login function from AuthContext
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign In</h2>
      {error && <p className="error-message" style={{color:"red"}}>{error}</p>}
      <form className="signup-form" onSubmit={handleSignIn}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="form-control"
          />
        </div>
        <button type="submit" className="submit-button">Sign In</button>
        <button className="signin-redirect-button" onClick={handleSignupRedirect}>
          Don't have an account? Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signin;