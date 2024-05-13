import { useMap } from '@vis.gl/react-google-maps';
import React, { useCallback, useEffect, useState } from 'react';

function MapHandler({selectedPlace}) {
    const [moved, setMoved] = useState(false);
    const [lastCenter, setLastCenter] = useState(selectedPlace);
    const [movedVector, setMovedVector] = useState([0, 0]);
    const searchAreaMoveDistanceSquared = 1500;
    const map = useMap();

    const handleMapMove = useCallback((center) => {
    }, []);

    useEffect(() => {
        if(!map)
            return;

        map.panTo(selectedPlace);
    }, [map, selectedPlace]);

    useEffect(() => {
        if(!map)
            return;

        map.addListener('dragend', () => {
            const center = map.getCenter();
            // Vector is accumulative
            const latDiff = center.lat() * 1000 - lastCenter.lat * 1000;
            const lngDiff = center.lng() * 1000 - lastCenter.lng * 1000;
            console.log(gLatDiff, gLngDiff, "Lat and Lng Diff")
            setLatDiff(gLatDiff + Math.abs(latDiff));
            setLngDiff(gLngDiff + Math.abs(lngDiff));
            console.log(lastCenter, "Last center");
            setLastCenter({lat: center.lat(), lng: center.lng()});

            // Set use state is async, therefore cannot use results right away in this function
        });
    }, [map, handleMapMove]);

    useEffect(() => {
        // Check if movedVector squared is greater than searchAreaMoveDistanceSquared
        const vectorSquared = gLatDiff * gLatDiff + gLngDiff * gLngDiff;
        console.log(vectorSquared, "Vector squared");
        if(vectorSquared > searchAreaMoveDistanceSquared) {
            setLatDiff(0);
            setLngDiff(0);
            setMoved(true);
        }
    }, [gLatDiff, gLngDiff]);

    return (
    <div>
        {moved ?? 
            <div>Map is loading...</div>
        }
    </div>
    );
}

export default React.memo(MapHandler);