import './styles/styles.css'
import { useState, useEffect } from 'react';
import { useMap } from '@vis.gl/react-google-maps';

import BuildMap from './components/map';
import SideBar from './components/sidebar';
import WarningBanner from './components/warningLocationBanner';

import areaSearch from './components/areaSearch';

function App() {
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState({latLng: {lat: 50.823160104758664, lng: -0.13640210224646782}, title:'Brighton'});
  const [pubs, setPubs] = useState([]);
  // ^ Defaults to Brighton, UK

  useEffect(() => {
    // Try and get users location
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLocationAllowed(true);
        setSelectedPlace({latLng: {lat: position.coords.latitude, lng: position.coords.longitude}, title: 'You'});
      });
    }

    areaSearch(selectedPlace.latLng, setPubs);
  }, []);

  return (
    <div>
      {
        !locationAllowed && <WarningBanner />
      }
      <SideBar pubs={pubs} setSelectedPlace={setSelectedPlace} />
      <div className='mapContainer'>
        <BuildMap selectedPlace={selectedPlace} setPubs={setPubs} />
      </div>
    </div>
  );
}

export default App;