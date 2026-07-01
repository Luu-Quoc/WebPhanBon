import axios from "axios";

const API_URL = "http://localhost:5000/api/product";

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/get-all`);

  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/get-details/${id}`);

  return response.data;
};

export const createProduct = async (formData, token) => {
  const response = await axios.post(`${API_URL}/create`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updateProduct = async (id, formData, token) => {
  const response = await axios.put(`${API_URL}/update/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deleteProduct = async (id, token) => {
  const response = await axios.delete(`${API_URL}/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
