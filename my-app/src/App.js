import React, { useState } from 'react';
import { Camera, Clock, Archive, ChevronLeft, ChevronRight } from 'lucide-react';
import './App.css'
import logo from './media/lisual-logo.png';

const ConstructionDashboard = () => {
  const [activeSection, setActiveSection] = useState('live');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const sections = [
    { id: 'live', name: 'Live Camera', icon: Camera },
    { id: 'timelapse', name: 'Timelapse', icon: Clock },
    { id: 'archive', name: 'Footage Archive', icon: Archive },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'live':
        return (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Live Camera Feed</h2>
            </div>
            <div className="card-content">
              <iframe 
                width="100%" 
                height="600" 
                src="//www.teleport.io/api/v2/player?feedid=fekiizlmvw6b&playmode=liveimageloop&imageplayspeed=1fps&playframeskipinterval=day&playframecount=600" 
                frameBorder="0" 
                allowFullScreen
                title="Live Camera Feed"
              ></iframe>
            </div>
          </div>
        );
      case 'timelapse':
        return (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Construction Progress Timelapse</h2>
            </div>
            <div className="card-content">
              <div className="placeholder">
                <Clock size={48} />
                <p>Timelapse player would go here</p>
              </div>
            </div>
          </div>
        );
      case 'archive':
        return (
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Footage Archive</h2>
            </div>
            <div className="card-content">
              <div className="placeholder">
                <Archive size={48} />
                <p>Footage archive browser would go here</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard">
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-content">
          <img src={logo} className={`logo-sidebar`}></img>
          <h1 className="dashboard-title">Dashboard</h1>
          <nav>
            {sections.map((section) => (
              <button
                key={section.id}
                className={`nav-btn ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <section.icon className="icon" size={24} />
                <span className="btn-text">{section.name}</span>
              </button>
            ))}
          </nav>
        </div>
        <button
          className="toggle-btn"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      </div>
      
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default ConstructionDashboard;