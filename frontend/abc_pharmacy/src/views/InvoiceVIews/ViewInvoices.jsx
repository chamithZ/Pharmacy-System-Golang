import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewInvoices = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/invoice/invoices');
        setItems(response.data.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleUpdate = (itemId) => {
    // Handle update logic here
    console.log(`Update item with ID: ${itemId}`);
  };

  const handleDelete = async (itemId) => {
    // Handle delete logic here
    console.log(itemId)
    try {
      await axios.delete(`http://localhost:8080/api/invoice/delete_invoice/${itemId}`);
      // Update the items state after successful deletion
      setItems((prevItems) => prevItems.filter((item) => item.invoiceid !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="py-10 lg:py-20 px-6 lg:px-16 md:px-10">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold">All Invoices</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className=" px-6 py-3 text-left text-s font-bold text-gray-500 uppercase tracking-wider">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-s font-bold text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-s font-bold text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th scope="col" className="px-6 py-3 text-left text-s font-bold text-gray-500 uppercase tracking-wider">
                Bill Type
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 ">
            {items.map((item) => (
              <tr key={item.invoiceid}>
                <td className="px-6 py-4 whitespace-nowrap  text-left">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left">
                  {item.Email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left">
                  {item.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left">
                  {item.billtype}
                </td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2 text-left">
                 
                  <button
                    onClick={() => handleDelete(item.invoiceid)}
                    className="font-bold text-center hover:bg-red-600 cursor-pointer rounded-3xl bg-red-400 py-2 px-5 text-white transition hover:bg-opacity-90"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewInvoices ;
