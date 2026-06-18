import axios from "axios";

const API_URL = "http://localhost:5000/api/order";

export const getOrders = async () => {
  const response = await axios.get(`${API_URL}/get-all`);
  return response.data;
};

export const createOrder = async (data, token) => {
  const response = await axios.post(`${API_URL}/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getOrdersByCustomer = async (customerId) => {
  const response = await axios.get(
    `http://localhost:5000/api/order/customer/${customerId}`,
  );

  return response.data;
};
export const getDebtOrders = async () => {
  const response = await axios.get("http://localhost:5000/api/order/debts");
  return response.data;
};
export const getOrderById = async (id) => {
  const response = await axios.get(
    `http://localhost:5000/api/order/get-details/${id}`,
  );

  return response.data;
};
