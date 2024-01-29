import { useEffect, useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

// The OMDB API URL with the provided API key
const API_URL = "http://www.omdbapi.com?apikey=7f00c20";

function App() {
  // State to store the list of movies and the search term
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Function to search movies based on the provided title
  const searchMovies = async (title) => {
    // Fetch data from the OMDB API using the provided title
    const response = await fetch(`${API_URL}&s=${title}`);

    // Parse the response as JSON
    const data = await response.json();
    console.log(data);
    // Set the list of movies in the state
    setMovies(data.Search);
  };

  // Event handler for Enter key press in the search input
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Trigger the searchMovies function when Enter key is pressed
      searchMovies(searchTerm);
    }
  };

  // Initial useEffect to perform a default search when the component mounts
  useEffect(() => {
    // Default search when the component mounts
    searchMovies("karate");
  }, []);

  return (
    <div className="app">
      <h1>ChaseFilm</h1>

      <div className="search animate__animated animate__fadeIn">
        {/* Input for searching movies */}
        <input
          type="text"
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress} // Call handleKeyPress on key down
        />

        {/* Search icon for searching movies */}
        <img
          className="animate__animated animate__backInRight"
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)} // Trigger searchMovies on click
        />
      </div>

      {movies?.length > 0 ? (
        // Display the container with MovieCard components if movies are available
        <div className="container">
          {movies.map((movie) => (
            // Render MovieCard component for each movie in the list
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        // Display a message if no movies are found
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
