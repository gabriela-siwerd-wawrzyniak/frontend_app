import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { homePath } from '../constants/routes';
import styles from '../styles/Login.module.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
        setLoading(true);
        try {
            const response = await fetch('https://my.api.mockaroo.com/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json', "x-api-key": "ed97eff0"},
                body: JSON.stringify({"email": email, "password": password}),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                setAuth(true, data.first_name, data.login_date);
                navigate(homePath);
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    }
  };

  const validate = () => {
    let valid = true;

    if (!email.trim()) {
      setEmailError('Field required');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password.trim()) {
      setPasswordError('Field required');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  return (
    <>
        <h1>Login Page</h1>
        <div className={styles["login-container"]}>
          <form onSubmit={handleLogin}>
              <h2>Log in to your account</h2>
              <div className={styles["input-container"]}>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
              </div>
              <div className={styles["input-container"]}>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
              </div>
              <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Log in'}</button>
          </form>
        </div>
    </>
  );
};

export default Login;