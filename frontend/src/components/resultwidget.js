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

function ResultWidget({pubObject}){
    let distance = (pubObject.distance / 1000).toFixed(2);
    let price = googlePriceLevelToSymbol(pubObject.price);

    return (
    <div className="resultWrapper">
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
        <h1 className="resultRating">{pubObject.rating}&#9733;</h1>
    </div>
    );
};

export default ResultWidget;