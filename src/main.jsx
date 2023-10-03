import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/index.jsx';
import './index.scss'
import { app } from './firebaseConfig.js'
import { ToastContainer } from 'react-toastify';
import "react-quill/dist/quill.snow.css";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>,
)