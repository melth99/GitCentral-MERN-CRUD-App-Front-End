import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Changed to useNavigate for consistency

import { signIn } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';

import './SignInForm.css';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [message, setMessage] = useState(''); // Error or success message
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage(''); // Clear message on input change
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData); // Call signIn from authService
      setUser(signedInUser); // Update UserContext with the signed-in user
      navigate('/'); // Redirect to home/dashboard
    } catch (err) {
      console.error('Sign-in error:', err.message);
      setMessage(err.message || 'Sign-in failed. Please try again.');
    }
  };

  const isFormInvalid = () => {
    return !formData.username || !formData.password; // Basic validation
  };

  return (
    <main className="signin-form">
      <h1>Sign In</h1>
      {message && <p className={message.includes('failed') ? 'error' : 'success'}>{message}</p>}
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            autoComplete="off"
            id="username"
            value={formData.username}
            name="username"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            autoComplete="off"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={isFormInvalid()}>
            Sign In
          </button>
          <button type="button" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
};

export default SignInForm;