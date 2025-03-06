import React, { createContext, useContext, useState, useEffect } from "react";

// Create the AppContext to provide global state management
const AppContext = createContext(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext must be used within AppContextProvider!");
  }
  return context;
};

const AppContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (savedFavorites) {
      setFavorites(savedFavorites);
    }
  }, []);

  // 🔹 Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  /**
   * Adds a spell to the favorites list.
   * Prevents duplicates by checking if the spell is already in favorites.
   * @param {Object} spell - The spell object to add.
   */
  const addToFavorites = (spell) => {
    if (!favorites.some((fav) => fav.index === spell.index)) {
      setFavorites((prevFavorites) => [...prevFavorites, spell]);
    }
  };

  /**
   * Removes a spell from the favorites list based on its index.
   * @param {string} spellIndex - The index of the spell to remove.
   */
  const removeFromFavorites = (spellIndex) => {
    setFavorites((prevFavorites) => prevFavorites.filter((spell) => spell.index !== spellIndex));
  };

  return (
    <AppContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;