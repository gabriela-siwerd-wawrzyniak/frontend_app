import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from 'components/Login';

jest.mock('react-router', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../store/authStore', () => ({
  useAuthStore: jest.fn(),
}));

jest.mock('../constants/api', () => ({
  API_URL: 'https://fake.api',
  API_KEY: 'fake-key',
  LOGIN_URL: `https://fake.api/login`,
}));

describe('Login component', () => {
  const mockSetAuth = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    const { useNavigate } = require('react-router');
    const { useAuthStore } = require('../store/authStore');

    useNavigate.mockReturnValue(mockNavigate);
    useAuthStore.mockImplementation((selector: any) =>
      selector({
        isAuthenticated: false,
        firstName: null,
        loginDate: null,
        setAuth: mockSetAuth,
        clearAuth: jest.fn(),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form', () => {
    render(<Login />);
    expect(screen.getByText(/login page/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('shows validation errors when both fields are empty', async () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(await screen.findAllByText(/field required/i)).toHaveLength(2);
  });

  it('shows validation errors when one field is empty', async () => {
    render(<Login />);
    await userEvent.type(screen.getByPlaceholderText(/email address/i), 'jane@example.com');
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(await screen.findAllByText(/field required/i)).toHaveLength(1);
  });

  it('calls API and redirects on successful login', async () => {
    const mockResponse = {
      id: 1,
      first_name: 'John',
      login_date: '2025-05-01T00:00:00Z',
    };

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    }) as jest.Mock;

    render(<Login />);

    await userEvent.type(screen.getByPlaceholderText(/email address/i), 'john@example.com');
    await userEvent.type(screen.getByPlaceholderText(/password/i), 'password123');

    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://fake.api/login', expect.any(Object));
      expect(mockSetAuth).toHaveBeenCalledWith(1, true, 'John', '2025-05-01T00:00:00Z');
      expect(mockNavigate).toHaveBeenCalledWith('/welcome');
    });

    (global.fetch as jest.Mock).mockRestore();
  });

  it('alerts on failed login', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    global.fetch = jest.fn().mockResolvedValue({ ok: false }) as jest.Mock;

    render(<Login />);

    await userEvent.type(screen.getByPlaceholderText(/email address/i), 'wrong@example.com');
    await userEvent.type(screen.getByPlaceholderText(/password/i), 'wrongpass');

    fireEvent.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Invalid credentials');
    });

    (window.alert as jest.Mock).mockRestore();
    (global.fetch as jest.Mock).mockRestore();
  });
});
