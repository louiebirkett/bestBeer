import '../styles/styles.css'

function SearchBar({pubs, setShownPubs}) {
    const search = (input) => {
        if(input === '') {
            setShownPubs(pubs);
            return;
        }
        
        const filter = new RegExp(input, 'i');
        const filteredPubs = pubs.filter(pub => filter.test(pub.name));
        setShownPubs(filteredPubs);
    };

    return (    
        <search>
            <form className='searchBar'>
                <input 
                    type="search" 
                    placeholder='Search for a Pub' 
                    onChange={(e) => search(e.target.value)} />
            </form>
        </search>
    )
 
}
export default SearchBar;