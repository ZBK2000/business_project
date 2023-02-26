import GoogleMapReact from 'google-map-react';
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
    }