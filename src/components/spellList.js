import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './spellList.css';
import { useAppContext } from './context/appContext';
import SearchBar from './searchBar';

const API = 'https://www.dnd5eapi.co/api/spells';

const SpellList = () => {
  const [spells, setSpells] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const { favorites, addToFavorites, removeFromFavorites } = useAppContext();

  useEffect(() => {
    axios
      .get(API)
      .then((res) => {
        setSpells(res.data.results);  
      })
      .catch((err) => console.log('Error fetching spells:', err));
  }, []);

  const favoritesChecker = (id) => favorites.some((spell) => spell.index === id);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="spell-list-container">
      <SearchBar onSearch={handleSearch} />

      <div className="spell-list">
        {(searchResults.length > 0 ? searchResults : spells).map((spell) => (
          <div key={spell.index} className="spell-entry">
            <Link to={`/spell/${spell.index}`} className="spell-entry-link">
              <h2 className="spell-title">{spell.name}</h2>
            </Link>
            <div className="button-container">
              {favoritesChecker(spell.index) ? (
                <button
                  className="remove-button"
                  onClick={() => removeFromFavorites(spell.index)}
                >
                  Remove from Favorites
                </button>
              ) : (
                <button
                  className="add-button"
                  onClick={() => addToFavorites(spell)}
                >
                  Add to Favorites
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpellList;