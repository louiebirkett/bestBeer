import { AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";

import PubInfo from "./pubInfo";

function CustomMarker({pubObject, infoShown, setInfoShown}) {
    const [markerRef, marker] = useAdvancedMarkerRef();

    return (
        <>
            <AdvancedMarker 
                ref={markerRef}
                onClick={() => setInfoShown(!infoShown)}
                position={{lat: pubObject.lat, lng: pubObject.long}}
                title={pubObject.name}
            />
            {
                infoShown &&
                    <InfoWindow
                        anchor={marker}
                        minWidth={400}
                        onCloseClick={() => setInfoShown(false)}>
                        <PubInfo pubObject={pubObject} />
                    </InfoWindow>
            }
        </>
    );
}

export default CustomMarker;