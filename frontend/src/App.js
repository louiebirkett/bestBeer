import './styles/styles.css'
import React, { useState, useEffect, Suspense } from 'react';

import SideBar from './components/sidebar';
import WarningBanner from './components/warningLocationBanner';
import LoadingSpinner from './components/loadingSpinner';

import areaSearch from './components/areaSearch';

// Lazy load the map for when its needed, rather than loading it on page load
const BuildMap = React.lazy(() => import('./components/map'));

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

      <Suspense fallback={<LoadingSpinner />}>
        <BuildMap 
          centreLocation={centreLocation}
          selectedPub={selectedPub}
          setSelectedPub={setSelectedPub} 
          pubs={pubs} 
          setPubs={setPubs} 
          shownPubs={shownPubs}
        />
      </Suspense>
    </div>
  );
}

export default App;