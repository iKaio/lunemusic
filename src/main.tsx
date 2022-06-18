import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./main.css";
import App from './pages/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/app/:appid" element={<App />} />
    </Routes>
  </BrowserRouter>
)
