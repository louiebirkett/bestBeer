import {APIProvider, Map, Marker, useMapsLibrary,} from '@vis.gl/react-google-maps';
import { useEffect } from 'react';



function BuildMap() {
  const position = {lat: 50.823160104758664, lng: -0.13640210224646782}; // Brighton => lat: 50.823160104758664, long: -0.13640210224646782
  return (
    <APIProvider apiKey={'AIzaSyA8WkVdelbke455KsAR_dzDz0FOEJja3iY'}>
      <Map 
        mapId = "1c5077200cf79e79" 
        defaultCenter={position}
        // center={position} 
        defaultZoom={16}
        style={{height: '100vh'}}
        streetViewControl={false}
        disableDefaultUI = {false}
        mapTypeControl={false}
        zoomControlOptions={true}
        >
        {/* <Marker position={position}/> */}
      </Map>
    </APIProvider>
  );
}

export default BuildMap;