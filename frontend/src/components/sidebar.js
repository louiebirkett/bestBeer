import React, { useState, useEffect } from 'react';
import '../styles/styles.css';
import ResultWidget from './resultwidget';
import SearchBar from './searchbar';

function SideBar({pubs, setSelectedPlace}) {
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
            pubObject={pub}
            setSelectedPlace={setSelectedPlace}
          />
        ))}
      </div>
    </div>
  );
}

export default SideBar;
