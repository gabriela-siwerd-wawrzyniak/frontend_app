import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { homePath } from '../constants/routes';
import styles from '../styles/Login.module.scss';
import { API_KEY, API_URL } from '../constants/api';

const Login = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore(state => state.setAuth);

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const newErrors = {
      email: form.email.trim() ? '' : 'Field required',
      password: form.password.trim() ? '' : 'Field required',
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      if (!response.ok) {
        alert('Invalid credentials');
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setAuth(true, data.first_name, data.login_date);
      navigate(homePath);
    } catch (error) {
      console.error('Login failed:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <header className={styles['header']}>
        <h1>Login Page</h1>
      </header>
      <section className={styles['login-container']}>
        <form onSubmit={handleLogin} noValidate>
          <h2>Log in to your account</h2>
          <div className={styles['input-container']}>
            <input
              id="email"
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange('email')}
            />
            {errors.email && (
              <p id="email-error" className={styles['error']}>
                {errors.email}
              </p>
            )}
          </div>

          <div className={styles['input-container']}>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange('password')}
            />
            {errors.password && (
              <p id="password-error" className={styles['error']}>
                {errors.password}
              </p>
            )}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? <span className={styles['spinner']} /> : 'Log in'}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
