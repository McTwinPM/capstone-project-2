import  { useRef, useEffect } from 'react'

function SearchBar({ searchTerm, setSearchTerm }) {
    const searchInputRef = useRef(null);

    useEffect(() => {
        searchInputRef.current.focus();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
    };

    return (
        <form className='search-form' onSubmit={handleSearch}>
            <input
                className='search-bar'
                type="text"
                ref={searchInputRef}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search drink recipes..."
            />
            <button className='search-button' type="submit">Search</button>
        </form>
    );
}

export default SearchBar;