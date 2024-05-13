import { useMap } from '@vis.gl/react-google-maps';
import React, { useEffect, useState } from 'react';

import areaSearch from './areaSearch';

function MapHandler({selectedPlace, setPubs}) {
    const [moved, setMoved] = useState(false);
    const [lastCenter, setLastCenter] = useState(selectedPlace.latLng);
    const [movedVector, setMovedVector] = useState([0, 0]);
    const searchAreaMoveDistanceSquared = 1500;
    const map = useMap();

    const handleMapMove = (center) => {
        const latDiff = center.lat() * 1000 - lastCenter.lat * 1000;
        const lngDiff = center.lng() * 1000 - lastCenter.lng * 1000;
        setMovedVector([movedVector[0] + Math.abs(latDiff), movedVector[1] + Math.abs(lngDiff)]);
        setLastCenter({lat: center.lat(), lng: center.lng()});
    };

    useEffect(() => {
        if(!map)
            return;

        map.panTo(selectedPlace.latLng);
    }, [map, selectedPlace]);

    useEffect(() => {
        if(!map)
            return;

        const listener = map.addListener('dragend', () => {
            handleMapMove(map.getCenter());
        });

        return () => {
            listener.remove();
        }
    }, [map, lastCenter, movedVector]);

    useEffect(() => {
        // Check if movedVector squared is greater than searchAreaMoveDistanceSquared
        const vectorSquared = movedVector[0] * movedVector[0] + movedVector[1] * movedVector[1];
        if(vectorSquared > searchAreaMoveDistanceSquared && !moved) {
            setMoved(true);
        }
    }, [movedVector, lastCenter]);

    return (
    <div id="map-handler-container">
        { moved &&
            <button id="map-reload" onClick={() => {
                areaSearch(lastCenter, setPubs);
                setMoved(false);
                setMovedVector([0, 0]);
            }}>
                Search this area
            </button>
        }
    </div>
    );
}

export default React.memo(MapHandler);