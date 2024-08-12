// src/components/MapView.tsx

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';

interface MapViewProps {
    startCoords?: { lat: number; lng: number };
    endCoords?: { lat: number; lng: number };
}

const MapView: React.FC<MapViewProps> = ({ startCoords, endCoords }) => {
    const position: LatLngExpression = startCoords ? [startCoords.lat, startCoords.lng] : [0, 0];
    const zoom = 13;

    return (
        <MapContainer center={position} zoom={zoom} style={{ height: '150px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {startCoords && (
                <Marker position={[startCoords.lat, startCoords.lng]}>
                    <Popup>Start</Popup>
                </Marker>
            )}
            {endCoords && (
                <Marker position={[endCoords.lat, endCoords.lng]}>
                    <Popup>End</Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default MapView;
