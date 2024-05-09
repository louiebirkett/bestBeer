import '../styles/styles.css'

// Function to get the price sign based on the locale
function getLocalePriceSign() {
    switch(navigator.language) {
        case "en-GB":
            return "£";
        case "en-US":
            return "$";
        case "de-DE":
        case "fr-FR":
        case "it-IT":
        case "es-ES":
            return "€";
        default:
            return "£";
    
    }
}

// Function to get the measurement unit based on the locale
function getLocaleDistanceMeasurement() {
    switch(navigator.language) {
        case "en-GB":
        case "de-DE":
        case "fr-FR":
        case "it-IT":
        case "es-ES":
            return "km";
        case "en-US":
        default:
            return "mi";
    }
}

// Function to transform Googles price level enum to a price indicator, based on users locale
function googlePriceLevelToSymbol(priceLevel) {
    let priceSign = getLocalePriceSign();
    switch(priceLevel) {
        case "PRICE_LEVEL_INEXPENSIVE":
            return priceSign;
        case "PRICE_LEVEL_MODERATE":
            return priceSign.repeat(2);
        case "PRICE_LEVEL_EXPENSIVE":
            return priceSign.repeat(3);
        case "PRICE_LEVEL_VERY_EXPENSIVE":
            return priceSign.repeat(4);
        default:
            return priceLevel;
    }
}

function getRatingStars(rating){
    let result =  100 - (rating / 5) * 27.25;
    return result + "%";
     
}

function ResultWidget({pubObject}){
    let distance = (pubObject.distance / 1000).toFixed(2);
    let price = googlePriceLevelToSymbol(pubObject.price);

    return (
    <div className="resultWrapper">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <h1 className='resultTitle' style={{fontSize: "larger"}}>{pubObject.name}</h1>
        <div className='partition'>
            <svg viewBox="0 0 415 36" fill="none" xmlns="http://www.w3.org/2000/svg"> <line y1="0.5" x2="415" y2="0.5" stroke="white"/> <line x1="270.5" y1="10" x2="270.5" y2="36" stroke="white"/></svg>
        </div>
        <div className='HCDWrapper'> {/* Hours, Cost, Distance*/ }
            <table>
                <tbody>
                    <tr>
                        <th scope='col'>Hours</th>
                        <th scope='col'>Cost</th>
                        <th scope='col'>Distance</th>
                    </tr>
                    <tr>
                        <td>{pubObject.hours}</td>
                        <td>{price}</td>
                        <td className="bold">{distance}{getLocaleDistanceMeasurement()}</td>
                    </tr>
                </tbody>
            </table>

            {/* <table>
                <tr>
                    <th scope='col'></th>
                    <th scope='col'></th>
                    <th scope='col'></th>
                </tr>
            </table> */}
        </div>
        <div>

        <div class="stars">
            <svg viewBox="0 0 576 512" width="100" title="star">
            <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
            </svg><svg viewBox="0 0 576 512" width="100" title="star">
            <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
            </svg><svg viewBox="0 0 576 512" width="100" title="star">
            <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
            </svg><svg viewBox="0 0 576 512" width="100" title="star">
            <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
            </svg><svg viewBox="0 0 576 512" width="100" title="star">
            <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
            </svg>

            <div class="cover" style={{ width: getRatingStars(pubObject.rating)  }}></div>
        </div>

</div>
    </div>
    );
};

export default ResultWidget;