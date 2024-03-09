import { CSSTransition } from "react-transition-group";
import "./App.css";

interface Movie {
  imdbID: string;
  Year: string;
  Poster: string;
  Title: string;
  Type: string;
  // Add more properties if needed
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <CSSTransition key={movie.imdbID} timeout={500} classNames="fade">
      <div className="movie">
        <div>
          <p>{movie.Year}</p>
        </div>
        <div>
          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/400"
            }
            alt={movie.Title}
          />
        </div>
        <div>
          <span>{movie.Type}</span>
          <h3>{movie.Title}</h3>
        </div>
      </div>
    </CSSTransition>
  );
};

export default MovieCard;
