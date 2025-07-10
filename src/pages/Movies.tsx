import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { api } from "../api/movies";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/movie";

export default function Movies() {
    const [input, setInput] = useState<string>('');
    const [movies, setMovies] = useState<Movie[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const getData = () => {
        if(input.length < 1 ) return;
        setLoading(true);
        api.get("/search", {
            params: {
                q: input,
            },
        })
            .then(r => {
                const data = r.data
                console.log(data)
                setMovies(data.description)
            })
            .finally(() => setLoading(false))
            .catch((err) => {
                console.error("Failed to fetchs data!", err);
                setLoading(false)
            });
    }

    return (
        <>
            <div className="flex justify-center gap-2 mb-4">
                <div className="flex w-full max-w-sm items-center gap-2">
                    <Input onChange={(e) => setInput(e.target.value)} type="text" placeholder="Search Movie" />
                    <Button onClick={getData} type="submit" variant="outline">
                        Search
                    </Button>
                </div>
            </div>

            {loading && (<p className="mb-4 text-center text-xl font-bold text-gray-700">Loading ...</p>)}

            {
                movies && (
                    <div className="grid justify-items-center grid-cols-2 md:grid-cols-4 gap-4 px-10">
                        {movies.map((movie: Movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                )
            }
        </>

    );
}