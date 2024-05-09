import React, { useState, useEffect } from 'react';
import '../styles/styles.css';
import ResultWidget from './resultwidget';
import SearchBar from './searchbar';
import WarningBanner from './warningLocationBanner';
import populateObject from './bestBeerApi';

function SideBar() {
  const [pubs, setPubs] = useState([]);
  const [locationAllowed, setLocationAllowed] = useState(false);

  function populate(lat, long, radius) {
    populateObject(lat, long, radius)
      .then(objects => {
        if (Array.isArray(objects)) {
          setPubs(objects);
        } else {
          console.error('Objects is not an array or is undefined.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    // Try to get users location, if enabled
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        populate(position.coords.latitude, position.coords.longitude, 5000);
        setLocationAllowed(true);
      });
    } else {
      // Ask user to select a location or allow location
      <WarningBanner />
      console.error('Geolocation is not supported by this device.');
    }
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  return (
    <div className='sidebarContainer'>
      <div className='searchContainer'>
        <SearchBar />
        <div className='filterIcon'>
          <svg viewBox="0 0 38 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* ... (your filter icon SVG) */}
          </svg>
        </div>
      </div>

      {
        !locationAllowed && <WarningBanner />
      }

      <div className='resultsContainer'>
        {pubs.map((pub, index) => (
          <ResultWidget
            pubObject={pub}
          />
        ))}
      </div>
    </div>
  );
}

export default SideBar;
