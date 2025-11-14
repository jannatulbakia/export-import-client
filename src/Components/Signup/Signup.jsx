import React, { useState } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  updateProfile,
  GoogleAuthProvider 
} from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    photoURL: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateForm = () => {
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName.trim() || !lastName.trim()) {
      setError('First and last names are required');
      return false;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      setError('Password must contain at least one uppercase letter');
      return false;
    }

    if (!/[a-z]/.test(password)) {
      setError('Password must contain at least one lowercase letter');
      return false;
    }

    if (!/[0-9]/.test(password)) {
      setError('Password must contain at least one number');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      await updateProfile(userCredential.user, {
        displayName: `${formData.firstName} ${formData.lastName}`,
        photoURL: formData.photoURL || null,
      });

      toast.success('Signup successful!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        photoURL: '',
      });
      navigate('/');
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
      toast.error(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user.displayName) {
        const [firstName, ...lastNameParts] = user.displayName.split(' ');
        const lastName = lastNameParts.join(' ') || 'User';

        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
        });
      }

      toast.success('Google signup successful!');
      navigate('/');
    } catch (err) {
      const errorMessage = err.code === 'auth/popup-closed-by-user'
        ? 'Signup cancelled'
        : err.message || 'Google signup failed';

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-5 bg-gray-100 min-h-screen">
      <form className="form" onSubmit={handleSubmit}>
        <p className="titlee">Register</p>
        <p className="message">Signup now and get full access to our app.</p>

        <div className="flex">
          <label>
            <input
              required
              placeholder=""
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="input"
              disabled={loading}
            />
            <span>Firstname</span>
          </label>
          <label>
            <input
              required
              placeholder=""
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="input"
              disabled={loading}
            />
            <span>Lastname</span>
          </label>
        </div>

        <label>
          <input
            required
            placeholder=""
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
            disabled={loading}
          />
          <span>Email</span>
        </label>

        <label>
          <input
            placeholder=""
            type="url"
            name="photoURL"
            value={formData.photoURL}
            onChange={handleChange}
            className="input"
            disabled={loading}
          />
          <span>Photo URL (optional)</span>
        </label>

        <label>
          <input
            required
            placeholder=""
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input"
            disabled={loading}
          />
          <span>Password</span>
        </label>

        <label>
          <input
            required
            placeholder=""
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="input"
            disabled={loading}
          />
          <span>Confirm password</span>
        </label>

        {error && <p className="error-message">{error}</p>}

        <button
          type="submit"
          className="submit"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Submit'}
        </button>

        <div className="divider">or</div>

        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={loading}
          className="google-btn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
          {loading ? 'Connecting...' : 'Sign up with Google'}
        </button>

        <p className="signin">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;