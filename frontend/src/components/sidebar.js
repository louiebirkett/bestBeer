import React, { useState, useEffect } from 'react';
import '../styles/styles.css';
import ResultWidget from './resultwidget';
import SearchBar from './searchbar';
import populateObject from './bestBeerApi';

function SideBar() {
  const [pubs, setPubs] = useState([]);

  useEffect(() => {
    populateObject("50.824", "-0.136", "5000")
      .then(objects => {
        if (Array.isArray(objects)) {
          const updatedPubs = objects.map(item => ({
            name: item.name,
            distance: item.distance,
            // Add more properties as needed
          }));
          console.log(updatedPubs, 'in scope');
          setPubs(updatedPubs);
        } else {
          console.error('Objects is not an array or is undefined.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  console.log(pubs, 'out of scope');

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

      <div className='resultsContainer'>
        {pubs.map((pub, index) => (
          <ResultWidget
            key={index}
            name={pub.name}
            rating={pub.rating}
            // hours={pub.hours}
            // cost={pub.cost}
            distance={pub.distance}
          />
        ))}
      </div>
    </div>
  );
}

export default SideBar;
