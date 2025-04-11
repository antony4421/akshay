import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/CustomerList.css';
import Sidebar from './components/sidebar/sidebar';
function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8005/api/employees');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const deleteCustomer = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await axios.delete(`http://localhost:8005/api/employees/${id}`);
        fetchCustomers();
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    }
  };

  return (
    <div className="dashboard-layout">
        <Sidebar /> 
    <div className="customer-container">
        
      <h2>All Customers</h2>
      <table className="customer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>ADDRESS</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((cust) => (
            <tr key={cust.id}>
              <td>{cust.id}</td>
              <td>{cust.name}</td>
              <td>{cust.email}</td>
              <td>{cust.phoneNumber}</td>
              <td>{cust.address}</td>
              <td>
                <button onClick={() => setSelectedCustomer(cust)}>View</button>
                <button className="delete-btn" onClick={() => deleteCustomer(cust.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedCustomer && (
        <div className="modal-overlay" onClick={() => setSelectedCustomer(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Customer Details</h3>
            <p><strong>Name:</strong> {selectedCustomer.name}</p>
            <p><strong>Email:</strong> {selectedCustomer.email}</p>
            <p><strong>Phone:</strong> {selectedCustomer.phoneNumber}</p>
            <p><strong>Address:</strong> {selectedCustomer.address}</p>
            <p><strong>id:</strong> {selectedCustomer.id}</p>
            <p><strong>Status:</strong> {selectedCustomer.status}</p>
            <button onClick={() => setSelectedCustomer(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default CustomerList;
