import React, { useState } from 'react';
import axios from 'axios';

const CreateInvoice = () => {
  const [formData, setFormData] = useState({
    name: '',
    Email: '',
    address: '',
    billtype: ''
  });

  const [errors, setErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const validateForm = () => {
    let newErrors = {};
  
    if (!formData.name) {
      newErrors.name = 'Customer name is required';
    }
   
    if (!formData.Email) {
      newErrors.Email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.Email)) {
      newErrors.Email = 'Invalid email address';
    }
    if (formData.billtype === 'Select Bill type') {
      newErrors.billtype = 'Please Select Bill type';
    }

    if (!formData.address) {
      newErrors.address = 'Please input address';
    }
 
   
    setErrors(newErrors);
  
    return Object.keys(newErrors).length === 0;
  };
  
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    

    if (isValid) {
      try {
        const response = await axios.post('http://localhost:8080/api/invoice/create_invoice', formData);
        console.log('Success:', response.data);
        setIsFormSubmitted(true);
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
          <h2 className="text-3xl font-bold">Create Invoice</h2>
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
                id="Email"
                value={formData.Email}
                onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
                className="border-[#E9EDF4] w-full rounded-3xl border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:ring focus:border-[#41A4FF] focus-visible:shadow-none"
              />
              {errors.Email && <p className="text-red-500">{errors.Email}</p>}
            </div>

            <div className="mb-6">
              <textarea
                placeholder="Address"
                type="text"
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="border-[#E9EDF4] w-full rounded-3xl border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:ring focus:border-[#41A4FF] focus-visible:shadow-none"
              />
              {errors.address && <p className="text-red-500">{errors.address}</p>}
            </div>
         
            

            <div className="mb-6">
              <div className="relative">
                <select
                  id="billtype"
                  value={formData.billtype}
                  onChange={(e) => setFormData({ ...formData, billtype: e.target.value })}
                  className="text-gray-400 block text-base border-[#E9EDF4] border appearance-none w-full py-3 px-5 bg-[#FCFDFE] rounded-3xl border-slate-300 focus:outline-none focus:ring"
                >
                  <option className="text-gray-300 " value="Select Bill type" >Select Bill type</option>
                  <option value="Credit/Debit Card">Credit/Debit Card</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Cash">Cash</option>
                </select>
                {errors.billtype && <p className="text-red-500">{errors.billtype}</p>}
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
            
           
            <div className="mb-10">
              <button
                type="submit"
                className="w-2/5 font-bold text-center hover:bg-gray-600 cursor-pointer rounded-3xl bg-[#41A4FF] py-3 px-5 text-white transition hover:bg-opacity-90"
              >
                Add Invoice
              </button>
            </div>
          </form>
        </div>

        
      </div>
    </div>
  );
};

export default CreateInvoice;
