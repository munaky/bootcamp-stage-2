import FavoriteCard from "../components/FavoriteCard";
import { useFavorites } from "../hooks/useFavorites";
import type { Favorite } from "../types/favorites";

export default function Favorites() {
    const { favorites } = useFavorites()

    return (
        <>
        {favorites.length == 0 ? (
            <p className="text-center text-xl font-semibold text-indigo-700">Empty Favorite Movies</p>
        )
        :
        (
            <div className="grid justify-items-center grid-cols-2 md:grid-cols-4 gap-4 px-10">
                {favorites.map((favorite: Favorite) => (
                    <FavoriteCard favorite={favorite} />
                ))}
            </div>
        )
        }
        </>

    );
}