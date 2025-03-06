import React, { useState } from 'react';
import axios from 'axios';
import './searchBar.css'; 

const API = 'https://www.dnd5eapi.co/api/spells';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(API);
      const allSpells = response.data.results || [];

      // Filter spells based on user input (API does not support direct search queries)
      const filteredSpells = allSpells.filter((spell) =>
        spell.name.toLowerCase().includes(query.toLowerCase())
      );

      onSearch(filteredSpells);
    } catch (error) {
      console.error('Error fetching spells:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search spells..."
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;