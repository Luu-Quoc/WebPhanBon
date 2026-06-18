import axios from "axios";

const API_URL = "http://localhost:5000/api/customer";

export const getCustomers = async () => {
  const response = await axios.get(`${API_URL}/get-all`);
  return response.data;
};

export const getCustomerById = async (id) => {
  const response = await axios.get(`${API_URL}/get-details/${id}`);
  return response.data;
};

export const createCustomer = async (data, token) => {
  const response = await axios.post(`${API_URL}/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const deleteCustomer = async (id, token) => {
  const response = await axios.delete(`${API_URL}/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
