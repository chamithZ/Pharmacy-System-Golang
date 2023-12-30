import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Header from '../../component/Header/Header';
import { Link } from 'react-router-dom';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    // Fetch all Items when the component mounts
    fetchItems();
  }, []);

  const fetchItems = () => {
    Axios.get('http://localhost:8080/api/item/items') 
      .then((response) => {
        setItems(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching Items:', error);
      });
  };

  const handleFilter = () => {
    if (filterType === '') {
      setFilteredItems([]);
    } else {
      const filtered = items.filter((item) => item.category === filterType);
      setFilteredItems(filtered);
    }
  };

  return (
    <div>
    <Header/>
    <div className="container mx-auto p-4">
        
      <h1 className="text-3xl font-medium mb-4 text-blue-600">Products</h1>
      <div className="flex mb-4">
        <select
          className="border rounded-l  p-2  border-blue-400 rounded-md text-darkblue bg-lightblue" 
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="JPrescription Medication">JPrescription Medication</option>
          <option value="Medical Devices">Medical Devices</option>
          <option value="Dietary Supplements">Dietary Supplements</option>
          <option value="Personal Care and Hygiene Product">Personal Care and Hygiene Product</option>
          <option value="First Aid Supplies">First Aid Supplies</option>
          <option value="Skin Care Product">Skin Care Product</option>
        </select>
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
        >
          Search
        </button>
      </div>
      <div className="mt-4">
        {(filterType === '' ? items : filteredItems).map((item) => (
          <Link to={`/item/${item._id}`} className="text-black">
          <div
            key={item.ID}
            className="bg-white border p-4 rounded shadow-md mb-4"
          >
            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
            <p className="text-gray-600">LKR {item.UnitPrice}</p>
            <p className="text-gray-500 mt-2">Type: {item.category}</p>
          </div>
          
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ItemList;