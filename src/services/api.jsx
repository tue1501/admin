import axios from 'axios';

const API_URL = 'https://nodejsmau-production.up.railway.app/api';

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImlhdCI6MTc0MzIzNjg4MCwiZXhwIjoxNzQzODQxNjgwfQ.QSv14GdJ-hlcIWEN2RxzoYTTMjtiLw26U5NOQThDIQo";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Request Config:', config); // Add this line
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Response:', response); // Add this line
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('Response Error:', error.response.data);
      console.error('Response Status:', error.response.status);
      console.error('Response Headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const productAPI = {
  getAll: () => axiosInstance.get('/product'),
  getById: (id) => axiosInstance.get(`/product/${id}`),
  create: (data) => axiosInstance.post('/product', data),
  update: (id, data) => axiosInstance.put(`/product/${id}`, data),
  delete: (id) => axiosInstance.delete(`/product/${id}`),
};

export const customerAPI = {
  getAll: () => axiosInstance.get('/users'),
  getById: (id) => axiosInstance.get(`/customer/${id}`),
  create: (data) => axiosInstance.post('/customer', data),
  update: (id, data) => axiosInstance.put(`/users/${id}`, {
    hoten: data.hoten,
    email: data.email,
    sdt: data.sdt,
    diachi: data.diachi
  }),
  delete: (id) => axiosInstance.delete(`/customer/${id}`),
};

export const orderAPI = {
  getAll: () => axiosInstance.get('/ordersall'),
  getById: (id) => axiosInstance.get(`/orders/${id}`),
  create: (data) => axiosInstance.post('/orders', data),
  update: (id, data) => axiosInstance.put(`/orders/${id}`, data),
  delete: (id) => axiosInstance.delete(`/orders/${id}`),
};

export const dashboardAPI = {
  getStats: () => axiosInstance.get('/dashboard/stats'),
};

export const productTypeDetailsAPI = {
  getAll: () => axiosInstance.get('/producttypedetails'),
  getById: (id) => axiosInstance.get(`/producttypedetails/${id}`),
  delete: (id) => axiosInstance.delete(`/producttypedetails/${id}`),
  create: (data) => axiosInstance.post('/addProductTypeDetail', data),
  update: (id, data) => axiosInstance.put(`/updateProductTypeDetail/${id}`, data),
};

export const productTypeAPI = {
  getAll: () => axiosInstance.get('/producttype'),
  getById: (id) => axiosInstance.get(`/producttype/${id}`),
  create: (data) => axiosInstance.post('/addProductType', data),
  update: (id, data) => axiosInstance.put(`/updateProductType/${id}`, data),
  delete: (id) => axiosInstance.delete(`/producttype/${id}`),
};

// Product Type API
export const fetchProductTypes = async () => {
  try {
    const response = await productTypeAPI.getAll(); // Gọi API lấy danh sách loại sản phẩm
    return response;
  } catch (error) {
    console.error('Error fetching product types:', error);
    throw error;
  }
};

export const fetchProductTypeById = async (id) => {
  return productTypeAPI.getById(id);
};

export const createProductType = async (data) => {
  return productTypeAPI.create(data);
};

export const updateProductType = async (id, data) => {
  return productTypeAPI.update(id, data);
};

export const deleteProductType = async (id) => {
  return productTypeAPI.delete(id);
};

// Product Type Details API
export const fetchProductTypeDetails = async () => {
  return productTypeDetailsAPI.getAll();
};

export const fetchProductTypeDetailById = async (id) => {
  return productTypeDetailsAPI.getById(id);
};

export const deleteProductTypeDetail = async (id) => {
  return productTypeDetailsAPI.delete(id);
};

export const addProductTypeDetail = async (data) => {
  return productTypeDetailsAPI.create(data);
};

export const updateProductTypeDetail = async (id, data) => {
  return productTypeDetailsAPI.update(id, data);
};

// Product API
export const fetchProducts = async () => {
  return productAPI.getAll();
};

export const fetchProductById = async (id) => {
  return productAPI.getById(id);
};

export const createProduct = async (data) => {
  return productAPI.create(data);
};

export const updateProduct = async (id, data) => {
  return productAPI.update(id, data);
};

export const deleteProduct = async (id) => {
  return productAPI.delete(id);
};

// Customer API
export const fetchCustomers = async () => {
  return customerAPI.getAll();
};

export const fetchCustomerById = async (id) => {
  return customerAPI.getById(id);
};

export const updateCustomer = async (id, data) => {
  return customerAPI.update(id, data);
};

// Order API
export const fetchOrders = async () => {
  return orderAPI.getAll();
};

export const fetchOrderById = async (id) => {
  return orderAPI.getById(id);
};

// Dashboard API
export const fetchDashboardStats = async () => {
  return dashboardAPI.getStats();
};