import React, {useState} from 'react';
import {loginUser} from '../services/user/user.service.tsx';
import {useAuth} from "../hooks/useAuth.tsx";
import {useNavigate} from "react-router-dom";
import {SelectedPages} from "../App.constants.tsx";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({username: '', password: ''});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await loginUser(formData);
      if (response.status === 200) {
        const user = response.data;
        login({
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role.split(', ').map((r: string) => r.trim()),
        });
        navigate(SelectedPages.Home);

        setFormData({username: '', password: ''});
      } else {
        setError('Unexpected response from server. Please try again.');
      }
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 401) {
          setError(err.response.data || 'Invalid username or password.');
        } else if (err.response.status === 500) {
          setError('An internal server error occurred. Please try again later.');
        } else {
          setError(err.response.data || 'An error occurred. Please try again.');
        }
      } else {
        setError('Unable to connect to the server. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>

        {error && (
          <div className="p-4 text-sm text-red-600 bg-red-100 border border-red-300 rounded">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
