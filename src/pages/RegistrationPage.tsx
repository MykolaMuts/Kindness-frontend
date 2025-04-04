import React, { useState } from 'react';
import {addUser} from "../services/user.service.tsx";
import {useAuth} from "../hooks/useAuth.tsx";
import {IRegistrationForm, SelectedPages} from "../App.constants.tsx";
import {useNavigate} from "react-router-dom";
import ShowRequestStatus from "../components/ShowRequestStatus.tsx";

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState<IRegistrationForm>({
    username: '',
    password: '',
    email: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      const response = await addUser(formData);
      if (response.status === 201) {
        await login(formData.username, formData.password);
        setSuccess(true);
        setFormData({ username: '', password: '', email: '' });
      } else {
        setError('Unexpected response from server. Please try again.');
      }
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 400) {
          setError(err.response.data || 'Invalid registration details.');
        } else if (err.response.status === 500) {
          setError('An internal server error occurred. Please try again later.');
        } else {
          setError('An unknown error occurred. Please try again.');
        }
      } else {
        setError('Unable to connect to the server. Please try again later.');
      }
    }
  };

  if(success){
    navigate(SelectedPages.Home);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">Register</h2>

        {/* Display error message */}
        {error && <ShowRequestStatus type="error" message={error} />}

        {/* Display success message */}
        {success && <ShowRequestStatus type="success" message="Login successful!" />}


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
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
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
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
