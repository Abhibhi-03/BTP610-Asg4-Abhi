import { createContext, useState } from 'react';

export const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const addToFavourites = (event) => {
    if (!favourites.find((e) => e.id === event.id)) {
      setFavourites([...favourites, event]);
    }
  };

  const removeFromFavourites = (id) => {
    setFavourites(favourites.filter((e) => e.id !== id));
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, addToFavourites, removeFromFavourites, clearFavourites }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
