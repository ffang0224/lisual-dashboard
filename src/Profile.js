import React from 'react';
import { User, MapPin, Phone, Camera, Key } from 'lucide-react';

const UserProfileCard = ({ userData }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-screen mx-auto">
      <div className="bg-blue-600 text-white p-4">
        <h2 className="text-2xl font-bold">{userData.name}</h2>
        <p className="text-sm opacity-75">ID: {userData.identifier}</p>
      </div>
      <div className="p-6">
        <div className="mb-4 flex items-center">
          <User className="mr-2 text-blue-600" size={20} />
          <span className="font-semibold">Nombre:</span>
          <span className="ml-2">{userData.owner}</span>
        </div>
        {userData.address && (
          <div className="mb-4 flex items-center">
            <MapPin className="mr-2 text-blue-600" size={20} />
            <span className="font-semibold">Direccion:</span>
            <span className="ml-2">{userData.address}</span>
          </div>
        )}
        {userData.contactList && userData.contactList.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Phone className="mr-2 text-blue-600" size={20} />
              <span className="font-semibold">Contacto:</span>
            </div>
            <ul className="list-disc list-inside pl-6">
              {userData.contactList.map((contact, index) => (
                <li key={index}>{contact}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <Camera className="mr-2 text-blue-600" size={20} />
            <span className="font-semibold">Livecam URL *TEST*:</span>
          </div>
          <a 
            href={userData.livecamURL} 
            className="text-blue-600 hover:underline break-all"
            target="_blank" 
            rel="noopener noreferrer"
          >
            {userData.livecamURL}
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;