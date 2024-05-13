import {APIProvider, AdvancedMarker, Map, Marker, useMapsLibrary,} from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

import MapHandler from './mapHandler';
import CustomMarker from './customMarker';

function BuildMap({selectedPlace, pubs, setPubs}) {
  const [shownIndex, setShownIndex] = useState(-1);

  useEffect(() => {
    setShownIndex(-1);
  }, [pubs]);

  return (
    <APIProvider apiKey={'AIzaSyA8WkVdelbke455KsAR_dzDz0FOEJja3iY'}>
      <Map 
        // mapId = "1c5077200cf79e79" 
        mapId = "bd0b946321228e2e" // Change map ID to change what icons are displayed by default
        defaultCenter={selectedPlace.latLng}
        // center={position} 
        defaultZoom={16}
        style={{height: '100vh'}}
        streetViewControl={false}
        disableDefaultUI = {false}
        mapTypeControl={false}
        zoomControlOptions={true}
        >
        { 
          pubs.map((pub, index) => (
            <CustomMarker 
              key={index}
              selectedPlace={{latLng: {lat: pub.lat, lng: pub.long}, title: pub.name}}
              infoShown={index === shownIndex}
              setInfoShown={() => {
                if(index === shownIndex)
                  setShownIndex(-1);
                else
                  setShownIndex(index);
              }}
            />
          ))
        }
      </Map>

      <MapHandler selectedPlace={selectedPlace} setPubs={setPubs} />
    </APIProvider>
  );
}

export default BuildMap;