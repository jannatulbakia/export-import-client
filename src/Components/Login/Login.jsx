import React, { useState } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateLoginForm = () => {
    if (!loginData.email.includes('@')) {
      setError('Please enter a valid email');
      return false;
    }

    if (!loginData.password) {
      setError('Password is required');
      return false;
    }

    if (loginData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateLoginForm()) return;

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );

      toast.success('Login successful!', {
        position: 'top-center',
        autoClose: 3000,
      });
      setLoginData({ email: '', password: '' });
      navigate('/');
    } catch (err) {
      let errorMessage = 'Login failed';

      if (err.code === 'auth/user-not-found') {
        errorMessage = 'Email not found. Please sign up first.';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = 'Invalid password. Please try again.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format';
      } else if (err.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled';
      } else {
        errorMessage = err.message || 'Login failed. Please try again.';
      }

      setError(errorMessage);
      toast.error(errorMessage, {
        position: 'top-center',
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      toast.success('Google login successful!', {
        position: 'top-center',
        autoClose: 3000,
      });
      navigate('/');
    } catch (err) {
      const errorMessage =
        err.code === 'auth/popup-closed-by-user'
          ? 'Login cancelled'
          : err.message || 'Google login failed';

      setError(errorMessage);
      toast.error(errorMessage, {
        position: 'top-center',
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!resetEmail.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success('Password reset email sent! Check your inbox.', {
        position: 'top-center',
        autoClose: 3000,
      });
      setResetEmail('');
      setShowForgotPassword(false);
    } catch (err) {
      let errorMessage = 'Failed to send reset email';

      if (err.code === 'auth/user-not-found') {
        errorMessage = 'Email not found';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format';
      } else {
        errorMessage = err.message || 'Failed to send reset email';
      }

      setError(errorMessage);
      toast.error(errorMessage, {
        position: 'top-center',
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="card-border">
        <div className="card">
          <h4 className="title">
            {showForgotPassword ? 'Reset Password' : 'Log In!'}
          </h4>

          {!showForgotPassword ? (
            <>
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <svg
                    className="input-icon"
                    viewBox="0 0 500 500"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 193.4-175.4c91.54 8.869 158.6 91.25 158.6 183.2l0 16.16c0 22.09-17.94 40.05-40 40.05s-40.01-17.96-40.01-40.05v-120.1c0-8.847-7.161-16.02-16.01-16.02l-31.98 .0036c-7.299 0-13.2 4.992-15.12 11.68c-24.85-12.15-54.24-16.38-86.06-5.106c-38.75 13.73-68.12 48.91-73.72 89.64c-9.483 69.01 43.81 128 110.9 128c26.44 0 50.43-9.544 69.59-24.88c24 31.3 65.23 48.69 109.4 37.49C465.2 369.3 496 324.1 495.1 277.2V256.3C495.1 107.1 361.2-9.332 207.8 20.73zM239.1 304.3c-26.47 0-48-21.56-48-48.05s21.53-48.05 48-48.05s48 21.56 48 48.05S266.5 304.3 239.1 304.3z"></path>
                  </svg>
                  <input
                    autoComplete="off"
                    id="logemail"
                    placeholder="Email"
                    className="input-field"
                    name="email"
                    type="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    disabled={loading}
                  />
                </div>

                <div className="field">
                  <svg
                    className="input-icon"
                    viewBox="0 0 500 500"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"></path>
                  </svg>
                  <input
                    autoComplete="off"
                    id="logpass"
                    placeholder="Password"
                    className="input-field"
                    name="password"
                    type="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    disabled={loading}
                  />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button className="btnn" type="submit" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>

                <button
                  type="button"
                  className="btnn google-login-btn"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginRight: '8px' }}
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.51h5.84c-.25 1.35-.98 2.49-2.07 3.24v2.69h3.34c1.95-1.79 3.07-4.43 3.07-7.69z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.34-2.69c-1.01.68-2.3 1.08-3.94 1.08-3.02 0-5.58-2.03-6.49-4.76H2.74v2.99C4.55 20.44 7.77 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.51 14.24C5.28 13.49 5.16 12.7 5.16 11.9c0-.8.12-1.59.35-2.34V6.57H2.74C1.96 8.15 1.5 10 1.5 11.9c0 1.9.46 3.75 1.24 5.34l2.77-2.99z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.81c1.64 0 3.11.56 4.27 1.66l3.2-3.2C17.46 2.76 14.97 1.5 12 1.5c-4.23 0-7.45 2.56-9.26 6.04l2.77 2.99c.91-2.73 3.47-4.76 6.49-4.76z"
                      fill="#EA4335"
                    />
                  </svg>
                  {loading ? 'Connecting...' : 'Login with Google'}
                </button>

                <button
                  type="button"
                  className="btnn-link"
                  onClick={() => setShowForgotPassword(true)}
                  disabled={loading}
                >
                  Forgot your password?
                </button>
              </form>

              <div
                className="signup-link"
                style={{ textAlign: 'center', marginTop: '15px' }}
              >
                <p
                  style={{
                    fontSize: '14px',
                    color: 'rgba(88, 87, 87, 0.822)',
                  }}
                >
                  Don't have an account?{' '}
                  <Link
                    to="/signup"
                    style={{
                      color: '#283593',
                      fontWeight: '600',
                      textDecoration: 'none',
                    }}
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <form onSubmit={handleForgotPassword}>
              <div className="field">
                <svg
                  className="input-icon"
                  viewBox="0 0 500 500"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 193.4-175.4c91.54 8.869 158.6 91.25 158.6 183.2l0 16.16c0 22.09-17.94 40.05-40 40.05s-40.01-17.96-40.01-40.05v-120.1c0-8.847-7.161-16.02-16.01-16.02l-31.98 .0036c-7.299 0-13.2 4.992-15.12 11.68c-24.85-12.15-54.24-16.38-86.06-5.106c-38.75 13.73-68.12 48.91-73.72 89.64c-9.483 69.01 43.81 128 110.9 128c26.44 0 50.43-9.544 69.59-24.88c24 31.3 65.23 48.69 109.4 37.49C465.2 369.3 496 324.1 495.1 277.2V256.3C495.1 107.1 361.2-9.332 207.8 20.73zM239.1 304.3c-26.47 0-48-21.56-48-48.05s21.53-48.05 48-48.05s48 21.56 48 48.05S266.5 304.3 239.1 304.3z"></path>
                </svg>
                <input
                  autoComplete="off"
                  placeholder="Enter your email"
                  className="input-field"
                  type="email"
                  value={resetEmail}
                  onChange={(e) => {
                    setResetEmail(e.target.value);
                    setError('');
                  }}
                  disabled={loading}
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <button className="btnn" type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>

              <button
                type="button"
                className="btnn-link"
                onClick={() => {
                  setShowForgotPassword(false);
                  setError('');
                  setResetEmail('');
                }}
                disabled={loading}
              >
                Back to Login
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;