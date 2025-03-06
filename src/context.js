import React, { useState, useEffect, useCallback, useContext } from 'react';
import axios from 'axios';

const API_URL = 'https://www.dnd5eapi.co/api/spells';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('fireball');
  const [spells, setSpells] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultTitle, setResultTitle] = useState('');

  // Fetch spells based on the search term
  const fetchSpells = useCallback(async () => {
    setLoading(true);
  
    try {
      const response = await axios.get(`${API_URL}`);
      const data = response.data.results;
  
      const filteredSpells = data.filter(spell => spell.name.toLowerCase().includes(searchTerm.toLowerCase()));
  
      if (filteredSpells.length > 0) {
        setSpells(filteredSpells);
        setResultTitle('Search Results');
      } else {
        setSpells([]);
        setResultTitle('No Results Found!');
      }
    } catch (error) {
      console.error('Error fetching spells:', error);
      setSpells([]);
      setResultTitle('Error fetching data');
    }
  
    setLoading(false);
  }, [searchTerm]);

  useEffect(() => {
    fetchSpells();
  }, [searchTerm, fetchSpells]);

  const addToFavorites = (spell) => {
    setFavorites([...favorites, spell]);
  };

  const removeFromFavorites = (spellId) => {
    setFavorites(favorites.filter((spell) => spell.index !== spellId));
  };

  const favoritesChecker = (id) => favorites.some((spell) => spell.index === id);

  return (
    <AppContext.Provider
      value={{
        loading,
        spells,
        favorites,
        resultTitle,
        searchTerm,
        setSearchTerm,
        addToFavorites,
        removeFromFavorites,
        favoritesChecker,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };