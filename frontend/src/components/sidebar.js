import '../styles/styles.css'
function SideBar(){
    return(
        
        <div className='sidebarContainer'>
            <SearchBar/>
        </div>
    )

}



function SearchBar(){
    return (    
    <search>
        <form className='searchBar'>
            <input type="search" placeholder='Search for a Pub'></input>
        </form>
    </search>)
 
}


export default SideBar;