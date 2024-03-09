import React, { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

// Define the type for the movie object
interface Movie {
  imdbID: string;
  Year: string;
  Poster: string;
  Title: string;
  Type: string;
  // Add more properties if needed
}

const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  // State to store the list of movies and the search term
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Function to search movies based on the provided title
  const searchMovies = async (title: string) => {
    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json();
    console.log(data);
    setMovies(data.Search);
  };

  // Event handler for Enter key press in the search input
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchMovies(searchTerm);
    }
  };

  // Initial useEffect to perform a default search when the component mounts
  useEffect(() => {
    searchMovies("karate");
  }, []);

  return (
    <div className="app">
      <h1>ChaseFilm</h1>
      <div className="search animate__animated animate__fadeIn">
        <input
          type="text"
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <img
          className="animate__animated animate__backInRight"
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
