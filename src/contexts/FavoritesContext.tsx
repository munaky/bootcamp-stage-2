import { createContext } from "react";
import { type FavoritesContextType } from "../types/favorites";

export const FavoritesContext = createContext<FavoritesContextType | null>(null);