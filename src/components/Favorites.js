import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from './context/appContext';
import './Favorites.css'; 

const Favorites = () => {
  const { favorites, addToFavorites, removeFromFavorites } = useAppContext();

  // Checks if the spell is already in favorites
  const favoritesChecker = (index) => {
    const isFavorite = favorites.some((spell) => spell.index === index);
    return isFavorite;
  };

  return (
    <div className='favorites-container'>
      {favorites.length > 0 ? (
        favorites.map((spell) => (
          <div key={spell.index} className='spell-entry'>
            <h2>{spell.name}</h2>
            <Link key={spell.index} to={`/spell/${spell.index}`} className='spell-entry-link'>
              <div className="spell-details">
                {/* No image, just the spell name */}
                <p>{spell.name}</p>
              </div>
            </Link>
            <div className='button-container'>
              {favoritesChecker(spell.index) ? (
                <button onClick={() => removeFromFavorites(spell.index)} className='remove-button'>
                  Remove from Favorites
                </button>
              ) : (
                <button onClick={() => addToFavorites(spell)} className='add-button'>
                  Add to Favorites
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <h1>No favorites</h1>
      )}
    </div>
  );
};

export default Favorites;