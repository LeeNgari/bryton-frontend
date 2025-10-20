import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(identifier, password);
      navigate('/');
    } catch {
      setError('Invalid credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-soft-gray rounded-full flex items-center justify-center">
              <img src="/path/to/your/logo.png" alt="Logo" className="w-10 h-10" /> {/* Placeholder for logo */}
            </div>
          </div>
          <h2 className="text-3xl font-bold text-soft-black">Sign In</h2>
          <p className="mt-2 text-sm text-gray-600">Student Management System</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-soft-black mb-1">
                Username or Email
              </label>
              <input
                id="identifier"
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-soft-black transition-colors"
                placeholder="Enter username or email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-soft-black mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-soft-black transition-colors"
                placeholder="Enter password"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-soft-black text-white font-medium rounded-lg hover:bg-soft-gray-dark transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};