import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate username and password
    if (!formData.email || !formData.password) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please enter both username and password.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/user/login', formData);
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('jwtToken', token);
        const userRole = getUserRoleFromToken(token);

        if (userRole === 'Pharmacy_staff') {
          window.location.href = '/admindashboard';
        } else if (userRole === 'customer') {
          window.location.href = '/';
        }
      } else {
        Swal.fire({
          title: 'Login Error',
          text: 'Invalid username or password. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        console.error('Login error', response.data);
      }
    } catch (error) {
      Swal.fire({
        title: 'Login Error',
        text: 'Invalid Login Credentials. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      console.error('Login error', error);
    }
  };

  const getUserRoleFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.usertype;
    } catch (error) {
      console.error('Error decoding token:', error);
      return 'Unknown';
    }
  };

  const handleForgetPassword = () => {
    // Add logic to handle forget password
    Swal.fire({
      title: 'Forget Password',
      text: 'Please check your email for password recovery instructions.',
      icon: 'info',
      confirmButtonText: 'OK',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-3xl text-blue-500 mb-4">Welcome Back!</h2>
        <p className="text-gray-500 mb-4 text-xl">Stay with us for a healthy life</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="text-blue-500">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-blue-500">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#41A4FF]  hover:bg-blue-400 text-white font-semibold   rounded-3xl py-2 px-4  mb-4"
          >
            Login
          </button>
        </form>
        <button
          onClick={handleForgetPassword}
          className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-lg"
        >
          Forget Password?
        </button>
      </div>
    </div>
  );
}

export default Login;