import './styles/styles.css'
import { useState, useEffect } from 'react';
import { useMap } from '@vis.gl/react-google-maps';

import BuildMap from './components/map';
import SideBar from './components/sidebar';
import WarningBanner from './components/warningLocationBanner';

import areaSearch from './components/areaSearch';

function App() {
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [centreLocation, setCentreLocation] = useState({lat: 50.823160104758664, lng: -0.13640210224646782});
  const [selectedPub, setSelectedPub] = useState(null);
  const [pubs, setPubs] = useState([]);
  const [shownPubs, setShownPubs] = useState([]);
  // ^ Defaults to Brighton, UK

  useEffect(() => {
    // Try and get users location
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLocationAllowed(true);
        setCentreLocation({lat: position.coords.latitude, lng: position.coords.longitude});
      });
    }

    areaSearch(centreLocation, setPubs);
  }, []);

  // Reset the shown pubs whenever the list of pubs changes
  useEffect(() => {
    setShownPubs(pubs);
  }, [pubs]);

  // Update the centre location of the map whenever a pub is selected
  useEffect(() => {
    if(selectedPub === null)
      return;

    setCentreLocation({lat: selectedPub.lat, lng: selectedPub.long});
  }, [selectedPub]);

  return (
    <div>
      { !locationAllowed && <WarningBanner /> }

      <SideBar 
        pubs={pubs} 
        shownPubs={shownPubs}
        setShownPubs={setShownPubs}
        setSelectedPub={setSelectedPub} 
      />

      <BuildMap 
          centreLocation={centreLocation}
          selectedPub={selectedPub}
          setSelectedPub={setSelectedPub} 
          pubs={pubs} 
          setPubs={setPubs} 
          shownPubs={shownPubs}
        />
    </div>
  );
}

export default App;