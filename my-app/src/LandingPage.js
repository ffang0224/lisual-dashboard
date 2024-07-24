import React, { useState } from 'react';
import logo from './media/lisual-logo.png';
import { collection, addDoc } from "firebase/firestore";
import { db } from './firebase-config';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';


const LandingPage = () => {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault(); 
      
      navigate('/dashboard', { state: { keyword } });
      console.log('Submitted keyword:', keyword);
    };
  
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-10 sm:p-20">
            <img src={logo} alt="Lisual Logo" className="mx-auto mb-8" />
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Bienvenido a Lisual</h1>
            <p className="text-center text-gray-600 mb-8">
              Ingrese su identificador para acceder a su dashboard.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="ID"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
              type="submit" 
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Ingresar
            </button>
            </form>
          </div>
          <div className="bg-gray-50 px-10 py-6 sm:px-20 sm:py-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nuestros Servicios</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <img src="/api/placeholder/64/64" alt="Live Camera" className="mb-2" />
                <h3 className="font-semibold">Camara en vivo</h3>
              </div>
              <div className="flex flex-col items-center">
                <img src="/api/placeholder/64/64" alt="Timelapse" className="mb-2" />
                <h3 className="font-semibold">Timelapses</h3>
              </div>
              <div className="flex flex-col items-center">
                <img src="/api/placeholder/64/64" alt="Archive" className="mb-2" />
                <h3 className="font-semibold">Archivo Fotografico</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  

export default LandingPage;