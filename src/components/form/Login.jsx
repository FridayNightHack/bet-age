import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/betage_postreqver`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password, login }),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `HTTP error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        navigate('/admin');
      }
      setError(data.message);
    } catch (error) {
      console.error('Server error:', error);
      setError('Server connection error');
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="min-sm:w-[50%] relative flex flex-col items-center gap-y-20"
    >
      <div className="w-full relative flex flex-col gap-y-3">
        <div className="w-full">
          <label htmlFor="username" className="visually-hidden">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="w-full rounded-sm px-3 py-1 outline-none border-0 text-dark-gray"
            value={login}
            placeholder="Name"
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className="w-full">
          <label htmlFor="password" className="visually-hidden">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full rounded-sm px-3 py-1 outline-none border-0 text-dark-gray"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <span className="absolute top-full mt-2 text-sm text-red-400">
            {error}
          </span>
        )}
      </div>
      <div className="w-[80%] flex flex-col items-center gap-y-4">
        <button type="submit" className="light-button-main is-submit ">
          Login
        </button>
        <a href="/" className="default-link">
          Back
        </a>
      </div>
    </form>
  );
};

export default Login;
