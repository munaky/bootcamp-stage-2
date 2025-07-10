import { useState } from "react";
import { FavoritesContext } from "./FavoritesContext";
import { type Favorite } from "../types/favorites";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);


  return (
    <FavoritesContext value={{ favorites, setFavorites }}>
      {children}
    </FavoritesContext>
  );
}