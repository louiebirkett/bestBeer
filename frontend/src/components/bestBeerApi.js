


function populateObject( userLat, userLong, searchRadius){

    const url = 'https://mp1282.brighton.domains/ci536/index.php?' + 'userLat=' + userLat + '&userLong=' + userLong +  '&searchRadius =' + searchRadius;

        //  get the response from the API
        callApi();

        async function callApi(){
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Unable to connect to Api');
            }
            const data = await response.json();

            

            const information = data.map(record => ({
                name: data.name || "No name "
                /*
                rating: data.rating || "No rating available ",
                cost: data.cost || "Unknown",
                hours: data.todayHours || "Hours Unknown",
                open: data.openNow || "No information available",
                diatance: data.dist || "IDK"
                */
            }));

            console.log(information);
            return(information);
            

        } catch (error) {
            console.error('There has been a problem with the fetch operation:', error);
        }
    }
}

export default populateObject;