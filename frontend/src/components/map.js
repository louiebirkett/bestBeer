import { APIProvider, Map } from '@vis.gl/react-google-maps';

import MapHandler from './mapHandler';
import CustomMarker from './customMarker';

function BuildMap({centreLocation, selectedPub, setSelectedPub, pubs, setPubs, shownPubs}) {
  return (
    <div className='mapContainer'>
      <APIProvider apiKey={'AIzaSyA8WkVdelbke455KsAR_dzDz0FOEJja3iY'}>
        <Map 
          // mapId = "1c5077200cf79e79" 
          mapId = "bd0b946321228e2e" // Change map ID to change what icons are displayed by default
          defaultCenter={centreLocation}
          defaultZoom={16}
          style={{height: '100vh'}}
          streetViewControl={false}
          disableDefaultUI = {false}
          mapTypeControl={false}
          zoomControlOptions={true}>

          { 
            shownPubs.map((pub, index) => (
              <CustomMarker 
                key={index}
                pubObject={pub}
                infoShown={pub == selectedPub}
                setInfoShown={() => {
                  if(pub == selectedPub)
                    setSelectedPub(null);
                  else {
                    setSelectedPub(pub);
                  }
                }}
              />
            ))
          }

        </Map>

        <MapHandler centreLocation={centreLocation} setPubs={setPubs} />
      </APIProvider>
    </div>
  );
}

export default BuildMap;