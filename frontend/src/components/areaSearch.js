import getDataPromise from './bestBeerApi';

function areaSearch(selectedPlace, setPubs) {
    getDataPromise(selectedPlace.lat, selectedPlace.lng, 5000)
            .then(objects => {
                if (Array.isArray(objects)) {
                    setPubs(objects);
                } else {
                    console.error('Objects is not an array or is undefined.');
                }
            })
            .catch(error => {
                console.error(error);
            });
}

export default areaSearch;