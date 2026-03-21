import React, { useRef, useState, useContext, useEffect } from 'react'

function SearchBar({ searchTerm, setSearchTerm }) {
    const searchInputRef = useRef(null);

    useEffect(() => {
        searchInputRef.current.focus();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                ref={searchInputRef}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search drink recipes..."
            />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;