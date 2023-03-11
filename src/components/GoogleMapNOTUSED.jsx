import React, { useEffect, useMemo, useState } from 'react';
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useTheme } from "@emotion/react";
import { SvgIcon } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { async } from '@firebase/util';

function MapContainer(props) {
  
  const [map, setMap] = useState(null);
  const theme = useTheme();
  const navigate = useNavigate()
  const budapest = useMemo(()=>({ lat: 47.4979, lng: 19.0402 }), [])
  const margitIsland = { lat: 47.5181, lng: 19.0383 };
  const chainBridge = { lat: 47.4979, lng: 19.0402 };
  const {user} = UserAuth()
  
  function navigateToTrack (name){
    if (user) {
      navigate(`/tracks/${name}`);
    } else {
      navigate(`/login/${name}`);
    }
  }
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [center, setCenter] = useState({ lat: 47.4979, lng: 19.0402 })
  useEffect(()=>{
   async function fetchCenter(center){
    const response_loc = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${center}&key=${import.meta.env.VITE_GOOGLE_MAPS_API}`);
      const data_loc = await response_loc.json();
      
  
      if (data_loc.results.length > 0) {
        const location = data_loc.results[0].geometry.location;
        setCenter({lat:location.lat, lng:location.lng })
      } else {
        setCenter({ lat: 47.4979, lng: 19.0402 })
      }}
      fetchCenter(props.center)
  }, [props.center])
  
 /*  const locMarkers = useMemo(()=>{props.locations.map((item)=>(
    <Marker onClick={()=>navigateToTrack(item[1])}
    onMouseOver={() => handleMarkerHover({ lat: item[0][0], lng: item[0][1] })}
    onMouseOut={() => handleMarkerLeave()}
     position={{ lat: item[0][0], lng: item[0][1] }} />
  ))},[props.locations]) */
  let hoveredTrack 
  if (hoveredMarker){
    for (let right in props.tracks){
      if(props.tracks[right].name == hoveredMarker.name)
      {hoveredTrack = props.tracks[right]}
    }
  }
  const handleMarkerHover = (marker) => {
    setHoveredMarker(marker);
  };

  const handleMarkerLeave = () => {
    setHoveredMarker(null);
  };
  const onLoad = map => {
    setMap(map);
  };

  const onUnmount = map => {
    setMap(null);
  };

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
  const CustomIcon = () => (
    <SvgIcon component={LocationOnIcon} viewBox="0 0 24 24"  color="primary" fontSize="large" />
  );
  return (
    <LoadScript
      googleMapsApiKey= {import.meta.env.VITE_GOOGLE_MAPS_API}
    >
      <GoogleMap
        mapContainerStyle={{ height: "100vh", width: "100%" }}
        zoom={12}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
        onClick={handleMarkerLeave}
      >
     { props.locations.map(item => (
      <Marker
        key={item[1]}
        
        onMouseOver={() => handleMarkerHover({ lat: item[0][0], lng: item[0][1], name: item[1] })}
        onClick={() => handleMarkerHover({ lat: item[0][0], lng: item[0][1], name: item[1] })}
        icon={<CustomIcon />}
        position={{ lat: item[0][0], lng: item[0][1] }}
      />
    ))}
       {hoveredMarker && (
          <InfoWindow
            position={{lat: hoveredMarker.lat, lng: hoveredMarker.lng }}
           
          >
           <Grid
      item
      padding={"8px !important"}
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={2.2}
      width={"100%"}
      height={"100%"}
    >
      <Card
        className="tracks"
        sx={{ backgroundColor: theme.palette.secondary.main, margin: "auto", position:"relative" }}
        onClick={() => navigateToTrack(hoveredTrack.name)}
        key={hoveredTrack.name}
      >
       {/*  {heartList.includes(item.name) ?<FavoriteIcon  onClick={(e)=>changeHeart(e, item.name)} sx={{position:"absolute", color:"#fb7b7b", left:"85%", top:"5%"}}/>:
        <FavoriteBorderIcon onClick={(e)=>changeHeart(e, item.name)} sx={{position:"absolute",color:"#fb7b7b", left:"85%", top:"5%"}}/>} */}
        
        <CardMedia
          component="img"
          sx={{ height: 140 }}
          src={`${import.meta.env.VITE_BACKEND_URL}/img?user_id=${hoveredTrack.name}&number=${0}`}
          title=""
        />
        <CardContent>
        
          <Typography gutterBottom variant="h5" component="div">
            {hoveredTrack.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {hoveredTrack.location}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {hoveredTrack.price}FT
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {hoveredTrack.slot_number}P
          </Typography>
        </CardContent>
      </Card>
    </Grid>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapContainer;

/* import GoogleMapReact from 'google-map-react';
import RoomIcon from '@mui/icons-material/Room';


export default function SimpleMap({ locations }) {
  const mapOptions = {
    center: locations[0],
    zoom: 15,
  };

  const markers = locations.map((location) => (
    <Marker
      key={`${location.lat},${location.lng}`}
      lat={location.lat}
      lng={location.lng}
    />
  ));

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'YOUR_API_KEY' }}
        defaultCenter={mapOptions.center}
        defaultZoom={mapOptions.zoom}
      >
        {markers}
      </GoogleMapReact>
    </div>
  );
}

function Marker() {
    return (
        <div style={{
          position: 'absolute',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: 'red',
          transform: 'translate(-50%, -50%)',
        }} />
      );
    } */