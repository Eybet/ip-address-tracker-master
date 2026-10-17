import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MyMap = () => {
  return (
    <MapContainer maxZoom={18} minZoom={3} zoomControl={false} center={[36.75, 3.06]} zoom={13} style={{ height: '66vh', width: '100%' }}>
      <TileLayer maxZoom={18} minZoom={3} url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      <Marker position={[36.75, 3.06]}>
        <Popup>
          This is Algeria
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MyMap;