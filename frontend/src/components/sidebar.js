import '../styles/styles.css'
import ResultWidget from './resultwidget';
import SearchBar from './searchbar';
import populateObject from './bestBeerApi';





function SideBar(){

    
    const pubs = [
        // { name: 'Ye Old King and Queen', rating: '4.5', hours: '12:00 - 00:00', cost: '£££', distance: '10'},
        // { name: 'Another Pub', rating: '3.8' },
        // { name: 'Another Pub', rating: '3.8' },
        // { name: 'Another Pub', rating: '3.8' },
        // { name: 'Another Pub', rating: '3.8' },
        // { name: 'Another Pub', rating: '3.8' },
        // { name: 'Another Pub', rating: '3.8' },
        // { name: 'Another Pub', rating: '3.8' },
        // Example array of Pub - add pubs as needed - this can be changed in the future to take input from database.
      ];


    
    
      

      const objects = populateObject("50.824", "-0.136", "5000");
      
      if (Array.isArray(objects)) {
        objects.forEach(item => {
            pubs.push({
                name: item.name,
                distance: item.distance
            })
        })
      }

      console.log(objects);

    //   console.log(pubs);
      

    

    
    //   if (Array.isArray(objects)) {
    //       const pubs = objects.map(item => ({
    //           name: item.name,
    //           rating: item.distance
    //       }));
      
    //       console.log(pubs);
    //   } else {
    //       console.error('Objects is not an array or is undefined.');
    //   }

      

    //   console.log(populateObject("", "", "p"));



    return(
        <div className='sidebarContainer'>
            <div className='searchContainer'>
                <SearchBar/>
                <div className='filterIcon'>
                    <svg viewBox="0 0 38 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.75 20.8125C12.75 20.3981 12.9146 20.0007 13.2076 19.7076C13.5007 19.4146 13.8981 19.25 14.3125 19.25H23.6875C24.1019 19.25 24.4993 19.4146 24.7924 19.7076C25.0854 20.0007 25.25 20.3981 25.25 20.8125C25.25 21.2269 25.0854 21.6243 24.7924 21.9174C24.4993 22.2104 24.1019 22.375 23.6875 22.375H14.3125C13.8981 22.375 13.5007 22.2104 13.2076 21.9174C12.9146 21.6243 12.75 21.2269 12.75 20.8125ZM6.5 11.4375C6.5 11.0231 6.66462 10.6257 6.95765 10.3326C7.25067 10.0396 7.6481 9.875 8.0625 9.875H29.9375C30.3519 9.875 30.7493 10.0396 31.0424 10.3326C31.3354 10.6257 31.5 11.0231 31.5 11.4375C31.5 11.8519 31.3354 12.2493 31.0424 12.5424C30.7493 12.8354 30.3519 13 29.9375 13H8.0625C7.6481 13 7.25067 12.8354 6.95765 12.5424C6.66462 12.2493 6.5 11.8519 6.5 11.4375ZM0.25 2.0625C0.25 1.6481 0.41462 1.25067 0.707646 0.957646C1.00067 0.66462 1.3981 0.5 1.8125 0.5H36.1875C36.6019 0.5 36.9993 0.66462 37.2924 0.957646C37.5854 1.25067 37.75 1.6481 37.75 2.0625C37.75 2.4769 37.5854 2.87433 37.2924 3.16735C36.9993 3.46038 36.6019 3.625 36.1875 3.625H1.8125C1.3981 3.625 1.00067 3.46038 0.707646 3.16735C0.41462 2.87433 0.25 2.4769 0.25 2.0625Z" fill="#D3D0D0"/>
                    </svg>
                </div>
            </div> 
            
            <div className='resultsContainer'>
                {pubs.map((pub, index) => (
                    <ResultWidget key={index} name={pub.name} rating={pub.rating} hours={pub.hours} cost={pub.cost} distance={pub.distance}/>
                ))}
            </div>
        </div>
    )
}





export default SideBar;