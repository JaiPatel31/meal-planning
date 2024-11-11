import { useEffect } from 'react';
import React from 'react';
import { useState } from 'react';
import './Search.css';

function Search({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            onSearch(searchTerm); // Call the callback with the search term
        }, 300);

        return () => clearTimeout(timerId);
    }, [searchTerm, onSearch]);

    return (
        <div className='search-main-container'>
            <div className='search-container'>
                <input
                    type="text"
                    placeholder="Find Recipes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='search-input'
                />
                <p>🔍</p>
            </div>
        </div>
    );
}

export default Search;