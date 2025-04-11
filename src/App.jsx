import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Pages
import DashboardPage from './pages/dashboard';
import ProductsPage from './pages/products';
import AddProductPage from './pages/products/add';
import EditProductPage from './pages/products/edit';
import ProductDetailPage from './pages/products/detail';
import OrdersPage from './pages/orders';
import OrderDetailPage from './pages/orders/detail';
import CustomersPage from './pages/customers';
import ProductTypesPage from './pages/productTypes';
import ProductTypeDetailPage from './pages/productTypeDetails';
import AddProductTypePage from './pages/productTypes/Add';
import EditProductTypePage from './pages/productTypes/Edit';
import AddProductTypeDetailPage from './pages/productTypeDetails/Add';
import EditProductTypeDetailPage from './pages/productTypeDetails/Edit';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />

          {/* Products */}
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/add" element={<AddProductPage />} />
          <Route path="products/edit/:id" element={<EditProductPage />} />
          <Route path="products/detail/:id" element={<ProductDetailPage />} />

          {/* Orders */}
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/detail/:id" element={<OrderDetailPage />} />

          {/* Product Details Types */}
          <Route path="ProductTypeDetailPage" element={<ProductTypeDetailPage />} />
          <Route path="productTypes/detail/:id" element={<ProductTypeDetailPage />} />
          <Route path="ProductTypeDetailPage/add" element={<AddProductTypeDetailPage />} />
          <Route path="ProductTypeDetailPage/editDetail/:detailId" element={<EditProductTypeDetailPage />} />

          {/* Customers */}
          <Route path="customers" element={<CustomersPage />} />

          {/* Product Types */}
          <Route path="productTypes" element={<ProductTypesPage />} />
          <Route path="productTypes/add" element={<AddProductTypePage />} />
          <Route path="productTypes/edit/:id" element={<EditProductTypePage />} />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;