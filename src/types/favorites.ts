export interface Favorite {
    '#TITLE': string;
    '#AKA': string;
    '#YEAR': string;
    '#ACTORS': string;
    '#IMG_POSTER': string;
    [key: string]: any;
}

export type FavoritesContextType = {
  favorites: Favorite[] | [];
  setFavorites: (favorites: Favorite[]) => void;
};
