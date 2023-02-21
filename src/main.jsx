import { createRoot } from 'react-dom/client';
import App from './layout/Layout';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
import "./index.css";
import "./css/Costum.css"
import { Provider } from 'react-redux';
import store from './store';

// 👇️ wrap App in Router

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);