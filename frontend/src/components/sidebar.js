import React, { useState, useEffect } from 'react';
import '../styles/styles.css';
import ResultWidget from './resultwidget';
import SearchBar from './searchbar';

function SideBar({pubs, shownPubs, setShownPubs, setSelectedPub}) {
  return (
    <div className='sidebarContainer'>
      <div className='searchContainer'>
        <SearchBar pubs={pubs} setShownPubs={setShownPubs} />
        <div className='filterIcon'>
          <svg viewBox="0 0 38 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* ... (your filter icon SVG) */}
          </svg>
        </div>
      </div>

      <div className='resultsContainer'>
        {shownPubs.map((pub, index) => (
          <ResultWidget
            key={index}
            pubObject={pub}
            setSelectedPub={setSelectedPub}
          />
        ))}
      </div>
    </div>
  );
}

export default SideBar;
