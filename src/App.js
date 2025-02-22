import { useEffect, useState } from "react";
import Nav from "./component/Nav/nav";
import WatchedSummary from "./component/watchedList/watchedsummarty";
import WatchedMoviesList from "./component/watchedList/watchedMovieList";
import MovieDetails from "./component/watchedList/MovieDetails";
import Box from "./component/Box";
import Loader from "./component/Loader";
import ErrorMessage from "./component/errorMessage";
import MovieList from "./component/aside1/MovieList";

//  export const average = (arr) =>
//   arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
export function average(arr) {
  return arr.length ? arr.reduce((acc, cur) => acc + cur, 0) / arr.length : 0;
}

const App = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("Inception");
  const [error, setError] = useState("");
  const [isLoading,setIsLoading]=useState(false)
  const [watched, setWatched] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  


  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    ()=> {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?i=tt3896198&apikey=bb9d7d18&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return (
    <>
    
    
      <Nav movies={movies} query={query} setQuery={setQuery} />
      <main className="main">
        
      <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
        
      </main>
    </>
  );
};
export default App;
