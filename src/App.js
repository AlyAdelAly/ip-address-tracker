import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import { TileLayer, MapContainer } from 'react-leaflet';
import axios from 'axios';
import MarkerLocation from "./component/markerLocation";


const App = () => {

  const [position, setPosition] = useState([30.00944 , 31.20861]);
  const [location, setLocation] = useState([]);
  const [ipAddress, setIpAddress] = useState('');
  const [showAddressResults, setShowAddressResults] = useState(false);

  const handleInputChange = (e) => {
    setIpAddress(e.target.value);
  };

  const getAddressData = async (e) => {
    e.preventDefault();
    const apiKey = 'at_fuFlI1b50jWiqQjXVaq0y3bwP57tJ'
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`
    const res = await axios.get(url);
    setLocation(res.data);
    setShowAddressResults(true);
    setPosition([res.data.location.lat, res.data.location.lng]);
  }


  return (
    <div>
      <div className='flex flex-col justify-center items-center'>
        <h1 className="text-3xl font-bold mt-4 text-white">Ip Address Tracker</h1>
        <input className='w-auto md:w-60 lg:w-80 p-2 rounded-lg bg-slate-200 focus:border-black focus:outline-none mt-8' type='text' value={ipAddress} onChange={handleInputChange} />
        <button className='w-20 my-5 py-2 bg-blue-500 shadow-lg shadow-blue-500/50 hover:shadow-blue-500/40 text-white font-semibold rounded-lg justify-center' onClick={getAddressData}>Search</button>
        {
          location &&
          <div>
            {
              showAddressResults &&
              <div className='flex flex-col lg:flex-row bg-slate-200 mb-4 rounded-lg w-96 md:w-auto p-10 justify-center items-center'>
                <div className="flex flex-col justify-center items-center sm:py-2 md:py-2 lg:items-start lg:px-6">
                  <h1 className="text-slate-500 text-sm mb-2">IP ADDRESS</h1>
                  <h2 className="text-xl text-black">{location.ip}</h2>
                </div>
                <div className="flex flex-col justify-center items-center sm:py-2 md:py-2 lg:items-start px-6">
                  <h1 className="text-slate-500 text-sm mb-2">LOCATION</h1>
                  <h2 className="text-xl text-black">{location.location?.city}, {location.location?.region}, {location.location?.country}</h2>
                </div>
                <div className="flex flex-col justify-center items-center sm:py-2 md:py-2 lg:items-start px-6">
                  <h1 className="text-slate-500 text-sm mb-2">TIMEZONE</h1>
                  <h2 className="text-xl text-black">{location.location?.country}{location.location?.timezone}</h2>
                </div>
                <div className="flex flex-col justify-center items-center sm:py-2 md:py-2 lg:items-start px-6">
                  <h1 className="text-slate-500 text-sm mb-2">ISP</h1>
                  <h2 className="text-xl text-black">{location.isp}</h2>
                </div>
              </div>
            }
          </div>
        }
      </div>
      <div>
        <MapContainer center={position} zoom={12} scrollWheelZoom={true} className='h-[100vh]'>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerLocation location={position} region={location.location?.region} city={location.location?.city} />
        </MapContainer>
      </div>

    </div>
  );
}

export default App;
