import React, { useState, useEffect } from 'react';
import { Bell, ChevronDown, Camera, Clock, Archive, ChevronLeft, ChevronRight, Home, Users, Settings, CreditCard, HelpCircle } from 'lucide-react';
import Calendar from './Calendar.js';
import './App.css'
import logo from './media/lisualpro.png';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from './firebase-config';
import ImageGallery from './ImageGallery.js';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import UserProfileCard from './Profile.js';

const ConstructionDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Inicio');
  const [objects, setObjects] = useState({})
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userdata, setUserData] = useState({})

  const location = useLocation();
  const navigate = useNavigate();
  const word = location.state?.keyword || 'No word provided';
  
  const fetchPost = async () => {     
    await getDocs(collection(db, "usuarios"))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
            setObjects(newData);     
            newData.forEach(element => {
              console.log(element.identifier);
              if(element.identifier == word){
                setUserData(element);
              } 
            });      
        })
  } 
  
  useEffect(()=>{
    fetchPost();
  }, [])

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderContent = () => {
    switch (activeTab) {
      case 'Archivo Fotografico':
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Archivo Fotografico</h2>
            <div className="flex space-x-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onDateSelect={setSelectedDate}
                className="rounded-md border"
              />
              <div className="flex-1 bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-semibold mb-2">Fotos del dia {selectedDate.toDateString()}</h3>
                <ImageGallery selectedDate={selectedDate} />
              </div>
            </div>
          </div>
        );
        case 'Inicio':
          return(
            <div className="h-full flex flex-col">
      <h2 className="text-2xl font-semibold mb-4">Inicio</h2>
      <div className="flex justify-center content-center w-full h-screen overflow-hidden">
        <iframe
  src={userdata.livecamURL}
  title="Live Image"
  className={`rounded-lg ${
    userdata.orientation === 'vertical' 
      ? 'w-1/2 h-screen' 
      : 'w-7/8 h-7/8 aspect-video overflow-hidden'
  }`}
  allowFullScreen
/>
      </div>
    </div>
          );
          case 'Cuenta':
            return (
              <div className="container mx-auto p-7">
                <UserProfileCard userData={userdata} />
              </div>
            );
      default:
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-6">{activeTab}</h2>
            <div className="bg-white rounded-lg shadow p-4">
              <img 
                src="/api/placeholder/800/400" 
                alt="En progreso" 
                className="w-full h-64 object-cover rounded"
              />
            </div>
          </div>
        );
    }
  };

  const menuItems = [
    { name: 'Inicio', icon: <Home size={30} /> },
    { name: 'Archivo Fotografico', icon: <Archive size={30} /> },
    { name: 'Inversores', icon: <Users size={30} /> },
    { name: 'Opciones', icon: <Settings size={30} /> },
    { name: 'Pago', icon: <CreditCard size={30} /> },
    { name: 'Cuenta', icon: <Users size={30} /> },
    { name: 'Ayuda', icon: <HelpCircle size={30} /> }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-blue-600 text-white p-4 transition-all duration-300 ease-in-out`}>
        <div className="mb-8 flex items-center justify-between">
          {isSidebarOpen && <img src={logo} className='pt-5 w-3/4'></img>}
          <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-blue-700">
            {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>
        <nav>
          <ul className="space-y-6">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className={`p-6 rounded cursor-pointer ${activeTab === item.name ? 'bg-blue-700' : 'hover:bg-blue-500'} ${!isSidebarOpen ? 'flex justify-center' : ''}`}
                onClick={() => setActiveTab(item.name)}
              >
                {isSidebarOpen ? (
                  <div className="flex items-center">
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                  </div>
                ) : (
                  <div className="flex justify-center">
                    {item.icon}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-end">
          <div className="flex items-center">
            <Bell className="mr-4 text-gray-500" />
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => setActiveTab("Cuenta")}
            >
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold mr-2">
                J
              </div>
              <span className="mr-2">{userdata.user}</span>
              <ChevronDown className="text-gray-500" />
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default ConstructionDashboard;