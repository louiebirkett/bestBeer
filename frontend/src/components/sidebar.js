import '../styles/styles.css'
function SideBar(){
    return(
        <div className='sidebarContainer'>
            <search>
                <form className='searchBar'>
                    <input type="search" placeholder='Search for a Pub'></input>
                </form>
            </search>
        </div>
    )

}

export default SideBar;