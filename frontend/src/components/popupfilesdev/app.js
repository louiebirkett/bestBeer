import getBeer from './beers.js'
let map, popup, Popup;


/** Initializes the map and the custom popup. */
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 50.823237242676164, lng: -0.1362233305156453 }, //50.823237242676164, -0.1362233305156453
    zoom: 16,
  });

  /**
   * A customized popup on the map.
   */
  class Popup extends google.maps.OverlayView {
    position;
    containerDiv;
    pubName = 'This is my favourite pub';
    pubBeers;


    constructor(position, content, pubName, pubBeers) {
      super();
      this.position = position;
      content.classList.add("popup-bubble");
    
    // Popup Content
      // Pub Name
        const popupPubName = document.createElement('h1');
        popupPubName.classList.add('popup-text');
        popupPubName.textContent = `${this.pubName}`;
      //==================================================

      //Pub On Tap
        const popupTap = document.createElement('h2');
        popupTap.classList.add('popup-tapText');
        popupTap.textContent = 'On Tap';


        const popupTapIMGContainer = document.createElement('div');
        popupTapIMGContainer.classList.add('popup-imgContainer');
        const popupPricesContainer = document.createElement('div');
        popupPricesContainer.classList.add('popup-pricesContainer');
        const popupPrices = document.createElement('h2');
        popupPrices.classList.add('popup-pricesText');
        popupPrices.textContent = 'Prices'
        popupPricesContainer.appendChild(popupPrices);


        const beerArray = getBeer();
      
        for( let i = 0; i< beerArray.length; i++){
          if(beerArray[i].hasBeer == true){
            const popupTapImg = document.createElement('img');
            popupTapImg.classList.add('popup-TapImg')
            popupTapIMGContainer.appendChild(popupTapImg);
            popupTapImg.src = beerArray[i].img;
            

            const popupPriceBeer = document.createElement('h3');
            popupPriceBeer.classList.add('popup-pricesBeer');
            popupPriceBeer.textContent = beerArray[i].name;
            popupPricesContainer.appendChild(popupPriceBeer);
            
          }
        }



      content.appendChild(popupPubName);
      content.appendChild(popupTap);
      content.appendChild(popupTapIMGContainer);
      content.appendChild(popupPricesContainer)
       
      

      // This zero-height div is positioned at the bottom of the bubble.
      const bubbleAnchor = document.createElement("div");

      bubbleAnchor.classList.add("popup-bubble-anchor");
      bubbleAnchor.appendChild(content);
      // This zero-height div is positioned at the bottom of the tip.
      this.containerDiv = document.createElement("div");
      this.containerDiv.classList.add("popup-container");
      this.containerDiv.appendChild(bubbleAnchor);
      // Optionally stop clicks, etc., from bubbling up to the map.
      Popup.preventMapHitsAndGesturesFrom(this.containerDiv);
    }

    /** Called when the popup is added to the map. */
    onAdd() {
      this.getPanes().floatPane.appendChild(this.containerDiv);
    }
    /** Called when the popup is removed from the map. */
    onRemove() {
      if (this.containerDiv.parentElement) {
        this.containerDiv.parentElement.removeChild(this.containerDiv);
      }
    }
    /** Called each frame when the popup needs to draw itself. */
    draw() {
      const divPosition = this.getProjection().fromLatLngToDivPixel(
        this.position,
      );
      
      // Hide the popup 
      const display = 'none'

      if (display === "block") {
        this.containerDiv.style.left = divPosition.x + "px";
        this.containerDiv.style.top = divPosition.y + "px";
      }

      if (this.containerDiv.style.display !== display) {
        this.containerDiv.style.display = display;
      }
    }
  }

  

  popup = new Popup(
    new google.maps.LatLng(50.82469882448753, -0.13699794526868456), // 50.82469882448753, -0.13699794526868456 / /ye old king and queen
    document.getElementById("content"),
  );
  popup.setMap(map);

  
}
window.initMap = initMap;