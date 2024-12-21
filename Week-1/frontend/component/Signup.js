import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './common.css'; // Import your CSS file

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/signup', { // Replace with your signup API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Signup failed' }));
        throw new Error(errorData.message || 'Signup failed');
      }

      // Signup successful, redirect to signin or wherever appropriate
      navigate('/signin'); // Or navigate to a success page
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSigninRedirect = () => {
    navigate('/signin');
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      {error && <p className="error-message" style={{color:"red"}}>{error}</p>}
      <form className="signup-form" onSubmit={handleSignup}>
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
            autoComplete="new-password"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
            className="form-control"
          />
        </div>
        <button type="submit" className="submit-button">Sign Up</button>
        <button className="signup-redirect-button" onClick={handleSigninRedirect}>
          Already have an account? Sign In
        </button>
      </form>
    </div>
  );
}

export default Signup;