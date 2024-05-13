import {APIProvider, AdvancedMarker, Map, Marker, useMapsLibrary,} from '@vis.gl/react-google-maps';
import MapHandler from './mapHandler';

function BuildMap({selectedPlace, setPubs}) {
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
          <AdvancedMarker position={selectedPlace.latLng} title={selectedPlace.title} onClick={() => {
            console.log('Marker clicked: ' + selectedPlace.title);
          }}/>
        }
      </Map>

      <MapHandler selectedPlace={selectedPlace} setPubs={setPubs} />
    </APIProvider>
  );
}

export default BuildMap;