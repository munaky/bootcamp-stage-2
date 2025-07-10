import {
    Card,
    CardContent,
} from "./ui/card";
import { useFavorites } from "../hooks/useFavorites";
import { Button } from "./ui/button";
import type { Favorite } from "../types/favorites";

export default function FavoriteCard({ favorite }: { favorite: Favorite }) {
    const { favorites, setFavorites } = useFavorites();

    const handleUnfavorites = (favorite: Favorite) => {
        setFavorites(favorites.filter(f => f['#IMDB_ID'] != favorite['#IMDB_ID']));
    }

    return (
        <Card className="w-full max-w-sm h-full">
            <CardContent className="flex flex-col h-full">
                <img src={favorite['#IMG_POSTER'] || "./example.png"} alt={favorite['#TITLE']} className="aspect-square object-cover rounded-lg" />
                <div className="grow flex flex-col justify-between">
                    <div className="mt-4">
                        <p className="font-semibold text-lg">{favorite['#TITLE']}</p>
                    </div>
                    <Button onClick={() => handleUnfavorites(favorite)} className="mt-4 font-semibold text-white bg-red-500 hover:bg-red-600">
                        Remove
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
