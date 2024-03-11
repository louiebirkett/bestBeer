

async function populateObject(userLat, userLong, searchRadius) {
    
    const url = 'https://mp1282.brighton.domains/ci536/index.php?userLat=' + userLat + '&userLong=' + userLong + '&searchRadius=' + searchRadius;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Unable to connect to Api');
        }
        const data = await response.json();

        const pubs = data.map(item => ({
            name: item.name,
            distance: item.dist
        }));

        console.log(pubs);

        
        return pubs;

    } catch (error) {
        console.error('There has been a problem with the fetch operation:', error);
        return null; // Or handle the error appropriately
    }
}


export default populateObject;