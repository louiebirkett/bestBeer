function setBeer(name, img, hasBeer, price) {
    this.name = name;
    this.img = img;
    this.hasBeer = hasBeer;
    this.price = price;
}

function getBeer(){
        const Guinness = {name: 'Guinness', img: 'guinness.svg', price: 6.20, hasBeer: true}
        const Moretti = {name: 'Moretti', img: 'moretti.svg', price: 6.20, hasBeer: true}
        const StrongbowDF = {name: 'Strongbow DF', img: 'strongbow.svg', price: 5.80, hasBeer: true}
        const Fosters = {name: 'Fosters', img: 'fosters.svg', price: 4.80, hasBeer: true}
        const Heineken = {name:'Heineken', img: 'heineken.svg', price: 6.00, hasBeer: true}

        let beer = [Guinness, Moretti, StrongbowDF, Fosters, Heineken];

        return (beer);
}


export default getBeer;



