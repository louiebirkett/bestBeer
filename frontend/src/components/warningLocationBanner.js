function WarningBanner() {

    function askForLocation() {
        navigator.geolocation.getCurrentPosition(position => {
            window.location.reload();
        });
    }

    return (
        <div className="warningBanner">
            <p>Please enable location services and reload this page!</p>
            <button onClick={askForLocation}>Enable Location</button>
        </div>
    );
}

export default WarningBanner;