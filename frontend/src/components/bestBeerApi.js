// The endpoint for the backend API
const endpoint = 'https://mp1282.brighton.domains/ci536/api.php';

// Function that returns a promise that resolves to an array of objects from the backend API
function populateObject(userLat, userLong, searchRadius) {
    const url = endpoint + '?userLat=' + userLat + '&userLong=' + userLong + '&searchRadius=' + searchRadius;

    const pubs = [];
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Unable to connect to Api');
            }
            return response.json();
        })
        .then(data => {
            const pubs = data.map(item => ({
                name: item.name,
                type: item.type,
                lat: item.lat,
                long: item.long,
                distance: item.dist,
                rating: item.rating,
                ratingCount: item.userRatingCount,
                hours: 0,
                price: item.price,
                outdoorSeating: item.outdoorSeating,
                liveMusic: item.liveMusic,
                servesCocktails: item.servesCocktails,
                allowsDogs: item.allowsDogs
            }));
            return pubs;
        })
        .catch(error => {
            console.error('There has been a problem with the fetch operation:', error);
            return null; // Or handle the error appropriately
        });
}

export default populateObject;