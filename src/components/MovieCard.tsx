import {
  Card,
  CardContent,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

import { type Movie } from "../types/movie";
import { useFavorites } from "../hooks/useFavorites";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export default function MovieCard({ movie }: { movie: Movie }) {
  const { favorites, setFavorites } = useFavorites();
  const isFav = favorites.findIndex(fav => fav['#IMDB_ID'] == movie['#IMDB_ID']) != -1 ? true : false;

  const handleAddFavorites = (movie: Movie) => {
    const favIndex = favorites.findIndex(f => f['#IMDB_ID'] == movie['#IMDB_ID']);
    if (favIndex != -1) return;

    setFavorites([...favorites, movie]);
  }

  return (

    <Dialog>
      <DialogTrigger>
        <Card className="relative w-full max-w-sm h-full">
          <CardContent>
            {isFav && (<Badge className="absolute px-2 py-1 right-8 top-8 font-semibold bg-red-500 dark:text-white">Favorite</Badge>)}
            <img src={movie['#IMG_POSTER'] || "./example.png"} alt={movie['#TITLE']} className="aspect-square object-cover rounded-lg" />
            <div className="mt-4">
              <p className="font-semibold text-lg">{movie['#TITLE']}</p>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Movie Detail</DialogTitle>
          <DialogDescription>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="mt-4">
                  <p className="font-semibold text-lg">{movie['#TITLE']}</p>
                  <p className="font-semibold">AKA: {movie['#AKA']}</p>
                  <p className="font-semibold">Year: {movie['#YEAR']}</p>
                  <p className="font-semibold">Actors: {movie['#ACTORS']}</p>
                  <DialogTrigger>
                    <Button onClick={() => handleAddFavorites(movie)} className="mt-4 font-semibold text-white bg-blue-500 hover:bg-blue-600">
                      Favorite
                    </Button>
                  </DialogTrigger>
                </div>
              </div>
              <div>
                <img src={movie['#IMG_POSTER'] || "./example.png"} alt={movie['#TITLE']} className="aspect-square object-cover rounded-lg" />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
