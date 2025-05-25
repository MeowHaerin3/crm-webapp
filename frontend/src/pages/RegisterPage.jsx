import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      // Adjust the endpoint and payload as per your backend registration logic
      await axios.post('http://localhost:8000/api/register/', {
        email,
        username,
        password,
      });
      setSuccess('Registration successful! You can now log in.');
      // Set default theme to light after registration
      localStorage.setItem('theme', 'light');
      document.documentElement.setAttribute('data-theme', 'light');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError('Registration failed. ' + (err.response?.data?.detail || ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-sm border border-blue-200">
        <h2 className="text-3xl font-extrabold mb-2 text-center text-blue-700">Create Account</h2>
        <p className="mb-6 text-center text-gray-500">Register a new account</p>
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        {success && <div className="text-green-600 mb-4 text-center">{success}</div>}
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">Username</label>
          <input
            type="text"
            className="input input-bordered w-full bg-gray-100 placeholder-gray-700 text-gray-900"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            autoFocus
            placeholder="Choose a username"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">Email</label>
          <input
            type="email"
            className="input input-bordered w-full bg-gray-100 placeholder-gray-700 text-gray-900"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold text-gray-700">Password</label>
          <input
            type="password"
            className="input input-bordered w-full bg-gray-100 placeholder-gray-700 text-gray-900"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="Create a password"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-semibold text-gray-700">Confirm Password</label>
          <input
            type="password"
            className="input input-bordered w-full bg-gray-100 placeholder-gray-700 text-gray-900"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            placeholder="Repeat your password"
          />
        </div>
        <div className="mb-4 text-center">
          <span className="text-gray-600">Already have an account? </span>
          <Link to="/login" className="text-blue-600 hover:underline font-semibold">Login</Link>
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full shadow-md"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
