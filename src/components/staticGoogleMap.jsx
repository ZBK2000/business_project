import React, { useEffect, useMemo, useState } from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useTheme } from "@emotion/react";
import { SvgIcon } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { async } from '@firebase/util';

function GoogleMapIndividual(props) {
    const [map, setMap] = useState(null);
    const center = useMemo(()=>({ lat: props.coordinates[0], lng: props.coordinates[1] }), [])
  console.log(props)
  const mapOptions = {
    styles: [
      {
        featureType: 'poi',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'transit',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }],
      },
    ],
  };

  const onLoad = map => {
    setMap(map);
  };

  return (
    <LoadScript
      googleMapsApiKey= {import.meta.env.VITE_GOOGLE_MAPS_API}
    >
      <GoogleMap
        mapContainerStyle={{ height: "100%",minHeight:"300px", width: "100%" }}
        zoom={12}
       center={center}
        onLoad={onload}
      >
    
      <Marker
      
        
       
        
        position={{ lat: props.coordinates[0], lng: props.coordinates[1] }}
      />
   
      
      </GoogleMap>
    </LoadScript>
  );
}

export default GoogleMapIndividual;