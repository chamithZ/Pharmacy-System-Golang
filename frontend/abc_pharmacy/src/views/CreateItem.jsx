import React, { useState } from 'react';
import axios from 'axios';

const CreateItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    UnitPrice: '',
    category: ''
  });

  const [errors, setErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const validateForm = () => {
    let newErrors = {};
  
    if (!formData.name) {
      newErrors.name = 'Item name is required';
    }
  

  
    if (formData.category === 'Select a category') {
      newErrors.usertype = 'Please select a  category';
    }
  
   
    setErrors(newErrors);
  
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      try {
        const response = await axios.post('http://localhost:8080/api/item/create_item', formData);
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
          <h2 className="text-3xl font-bold">Add Item</h2>
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
                placeholder="price"
                type="number"
                id="price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, UnitPrice: e.target.value })}
                className="border-[#E9EDF4] w-full rounded-3xl border bg-[#FCFDFE] py-3 px-5 text-base text-body-color placeholder-[#ACB6BE] outline-none focus:ring focus:border-[#41A4FF] focus-visible:shadow-none"
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>

            <div className="mb-6">
              <div className="relative">
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="text-gray-400 block text-base border-[#E9EDF4] border appearance-none w-full py-3 px-5 bg-[#FCFDFE] rounded-3xl border-slate-300 focus:outline-none focus:ring"
                >
                  <option className="text-gray-300 " value="Select a category" >Select Category</option>
                  <option value="Prescription Medication">Prescription Medication</option>
                  <option value="Dietary Supplements">Dietary Supplements</option>
                  <option value="Medical Devices">Medical Devices</option>
                  <option value="Personal Care and Hygiene Product">Personal Care and Hygiene Product</option>
                  <option value="First Aid Supplies">First Aid Supplies</option>
                  <option value="First Aid Supplies">Skin Care Product</option>
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
            
           
            <div className="mb-10">
              <button
                type="submit"
                className="w-full font-bold text-center hover:bg-gray-600 cursor-pointer rounded-1xl bg-[#41A4FF] py-3 px-5 text-white transition hover:bg-opacity-90"
              >
                Add Item
              </button>
            </div>
          </form>
        </div>

        
      </div>
    </div>
  );
};

export default CreateItem;
