import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserRegisterView = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    usertype: '',
    password: '',
    repeatPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const validateForm = () => {
    let newErrors = {};
  
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
  
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
  
    if (formData.usertype === 'Select User Type') {
      newErrors.usertype = 'Please select a user type';
    }
  
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
  
    if (formData.repeatPassword !== formData.password) {
      newErrors.repeatPassword = 'Passwords do not match';
    }
  
    setErrors(newErrors);
  
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      try {
        const response = await axios.post('http://localhost:8080/api/user/create_user', formData);
        console.log('Success:', response.data);
        setIsFormSubmitted(true);
        window.location.href = '/login'; 
        
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.log('Form has errors. Please fix them before submitting.');
    }
  };

  return (
    <div>
      <div className="py-10 lg:py-20 px-16 lg:px-96 md:px-64 flex flex-col text-center">
        <div className="mb-8 text-center">
          <h2 className="text-5xl font-bold">SIGN UP</h2>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                placeholder="Name"
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-[#E9EDF4] w-full rounded-3xl border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:ring focus:border-[#41A4FF] focus-visible:shadow-none"
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div className="mb-6">
              <input
                placeholder="Email"
                type="text"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border-[#E9EDF4] w-full rounded-3xl border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:ring focus:border-[#41A4FF] focus-visible:shadow-none"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>

            <div className="mb-6">
              <div className="relative">
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, usertype: e.target.value })}
                  className="text-gray-400 block text-base border-[#E9EDF4] border appearance-none w-full py-3 px-5 bg-[#FCFDFE] rounded-3xl border-slate-300 focus:outline-none focus:ring"
                >
                  <option className="text-gray-300" >Select User Type</option>
                  <option value="Pharmacy_staff">Pharmacy Staff</option>
                  <option value="customer">Customer</option>
                </select>
                {errors.type && <p className="text-red-500">{errors.type}</p>}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M14.354 7.354a2 2 0 00-2.828 0L10 8.172 7.475 5.646a2 2 0 10-2.828 2.828l3.182 3.182a2 2 0 002.828 0l3.182-3.182a2 2 0 000-2.828z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <input
                placeholder="Password"
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="border-[#E9EDF4] w-full rounded-3xl border bg-[#FCFDFE] py-3 px-5 text-base text-body-color focus:ring placeholder-[#ACB6BE] outline-none focus:border-[#41A4FF] focus-visible:shadow-none"
              />
              {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>
            <div className="mb-9">
              <input
                placeholder="Repeat Password"
                type="password"
                id="repeatPassword"
                value={formData.repeatPassword}
                onChange={(e) => setFormData({ ...formData, repeatPassword: e.target.value })}
                className="border-[#E9EDF4] w-full text-base rounded-3xl border bg-[#FCFDFE] py-3 px-5 text-body-color focus:ring placeholder-[#ACB6BE] outline-none focus:border-[#41A4FF] focus-visible:shadow-none"
              />
              {errors.repeatPassword && <p className="text-red-500">{errors.repeatPassword}</p>}
            </div>
            <div className="mb-10">
              <button
                type="submit"
                className="w-2/5 font-bold text-center hover:bg-gray-600 cursor-pointer rounded-3xl bg-[#41A4FF] py-3 px-5 text-white transition hover:bg-opacity-90"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col justify-center text-center pb-20">
          <Link to="/login">
          <p className="text-base text-[#adadad]">
            Already a member yet?
            Sign In
          </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegisterView;
