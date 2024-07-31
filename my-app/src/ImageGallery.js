import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

const ImageGallery = ({ selectedDate }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const feedId = "fekwngayvxwn";
  const apiKey = "HWN2M2mcbZoyFDTfpaskQV9TBDk0Ir8bu4XWDxJQiBE";
  const apiBaseUrl = "https://www.teleport.io/api/v2";

  useEffect(() => {
    fetchImages(selectedDate);
  }, [selectedDate]);

  const fetchImages = async (date) => {
    setError(null);
    const startTime = `${date.toISOString().split('T')[0]}T00:00:00Z`;
    const endTime = `${date.toISOString().split('T')[0]}T23:59:59Z`;
    const interval = 3600;

    const queryUrl = `${apiBaseUrl}/frame-query?feedid=${feedId}&starttime=${startTime}&endtime=${endTime}&interval=${interval}&apikey=${apiKey}`;

    try {
      console.log("Fetching images from:", queryUrl);
      const response = await fetch(queryUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Received data:", data);
      
      if (!data.Frames || !Array.isArray(data.Frames)) {
        throw new Error("Invalid data format received from API");
      }

      const imageUrls = data.Frames.map(frameTime => ({
        url: `${apiBaseUrl}/frame-get?feedid=${feedId}&frametime=${frameTime}&sizecode=1080p&apikey=${apiKey}`,
        timestamp: frameTime
      }));
      
      setImages(imageUrls);
    } catch (error) {
      console.error("Error fetching images:", error);
      setError(error.message);
    }
  };

  if (error) {
    return <div className="text-red-500">Error loading images: {error}</div>;
  }

  const download = (imagen) => {
    var element = document.createElement("a");
    var file = new Blob(
      [
        imagen.url
      ],
      { type: "image/*" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "image.jpg";
    element.click();
  };
  return (
    <div>
      <div className="mb-4">Se han encontrado {images.length} imagenes para el dia {selectedDate.toDateString()}</div>
      <div className="mb-4 font-bold">Atencion! Espere unos segundos a que la imagen cargue.</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <div 
  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  onClick={() => download(image)}
>
  <Download className="text-white w-12 h-12 cursor-pointer" />
</div>
              <div className="absolute top-2 left-2 bg-white bg-opacity-70 p-1 rounded text-xs">
                {new Date(image.timestamp).toLocaleTimeString()}
              </div>
              <img 
                src={image.url} 
                alt={`Image ${index}`} 
                className="w-full h-full object-cover rounded"
                onError={(e) => {
                  console.error(`Error loading image ${index}:`, e);
                  e.target.src = 'https://via.placeholder.com/150?text=Image+Load+Error';
                }}
              />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;