import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './layout/Layout';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import axios from 'axios'

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
import "./index.css";
import { Provider } from 'react-redux';
import store from './store';
import apiService from './utils/apiService';

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    // config.headers['Content-Type'] = 'application/json';
    return config
  },
  error => {
    Promise.reject(error)
  }
)

if (import.meta.env.VITE_STATUS_PROJECT === "1") {
  console.log = () => {};
  console.debug = () => {};
  console.info = () => {};
  console.warn = () => {};
}

// 👇️ wrap App in Router

root.render(
  // <React.StrictMode>
  <>
  <link href="/assets/css/Costum.css" rel="stylesheet" type="text/css" />
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </>

);