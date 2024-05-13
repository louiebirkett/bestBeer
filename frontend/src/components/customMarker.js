import { useState } from "react";
import { AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";

function CustomMarker({selectedPlace, infoShown, setInfoShown}) {
    const [markerRef, marker] = useAdvancedMarkerRef();

    return (
        <>
            <AdvancedMarker 
                ref={markerRef}
                onClick={() => setInfoShown(!infoShown)}
                position={selectedPlace.latLng}
                title={selectedPlace.title}
            />

            {
                infoShown &&
                    <InfoWindow
                        anchor={marker}
                        onCloseClick={() => setInfoShown(false)}>
                        {selectedPlace.title}
                    </InfoWindow>
            }
        </>
    );
}

export default CustomMarker;