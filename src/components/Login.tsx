import { API_KEY, LOGIN_URL } from 'constants/api';
import { homePath } from 'constants/routes';

import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from 'store/authStore';
import { validateEmail } from 'utils/validation';

import styles from 'styles/Login.module.scss';

type LoginForm = {
  email: string;
  password: string;
};

type LoginFormErrors = Record<keyof LoginForm, string>;

type LoginResponse = {
  id: number;
  first_name: string;
  login_date: string;
};

const Login = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore(state => state.setAuth);

  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [errors, setErrors] = useState<LoginFormErrors>({ email: '', password: '' });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = (): boolean => {
    const newErrors: LoginFormErrors = {
      email: '',
      password: '',
    };

    if (!form.email.trim()) {
      newErrors.email = 'Field required';
    } else if (!validateEmail(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!form.password.trim()) {
      newErrors.password = 'Field required';
    }

    setErrors(newErrors);
    const hasErrors: boolean = Object.values(newErrors).some(error => error !== '');

    return !hasErrors;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      const response: Response = await fetch(LOGIN_URL, {
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

      const data: LoginResponse = await response.json();
      setAuth(data.id, true, data.first_name, data.login_date);
      navigate(homePath);
    } catch (error: unknown) {
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
              disabled={loading}
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
              disabled={loading}
            />
            {errors.password && (
              <p id="password-error" className={styles['error']}>
                {errors.password}
              </p>
            )}
          </div>

          <button disabled={loading}>
            {loading ? <span className={styles['spinner']} /> : 'Log in'}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
