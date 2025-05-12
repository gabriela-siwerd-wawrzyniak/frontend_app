import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async () => {
    if (email && password) {
      setLoading(true);
      try {
        const response = await fetch('https://my.api.mockaroo.com/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', "x-api-key": "ed97eff0" },
          body: JSON.stringify({ "email": email, "password": password }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token);
          setAuth(true, data.first_name, data.login_date);
          navigate('/welcome');
        } else {
          alert('Invalid credentials');
        }
      } catch (error) {
        console.error('Login failed:', error);
        alert('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please enter valid credentials');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Email address"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
    </div>
  );
};

export default Login;