import './styles/styles.css'
import { useState, useEffect } from 'react';
import { useMap } from '@vis.gl/react-google-maps';

import BuildMap from './components/map';
import SideBar from './components/sidebar';
import WarningBanner from './components/warningLocationBanner';

import areaSearch from './components/areaSearch';

function App() {
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState({lat: 50.823160104758664, lng: -0.13640210224646782});
  const [pubs, setPubs] = useState([]);
  // ^ Defaults to Brighton, UK

  useEffect(() => {
    // Try and get users location
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLocationAllowed(true);
        setSelectedPlace({lat: position.coords.latitude, lng: position.coords.longitude});
      });
    }

    areaSearch(selectedPlace, setPubs);
  }, []);

  return (
    <div>
      {
        !locationAllowed && <WarningBanner />
      }
      <SideBar pubs={pubs} setSelectedPlace={setSelectedPlace} />
      <div className='mapContainer'>
        <BuildMap selectedPlace={selectedPlace} />
      </div>
    </div>
  );
}

export default App;