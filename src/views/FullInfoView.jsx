import { useState, useEffect } from 'react';
import { NavLink, Route, useParams, useRouteMatch } from 'react-router-dom';
import * as moviesAPI from '../services/moviesDB-api';
import Status from '../components/Status';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import ActorsInfoView from './ActorsInfoView';
import Review from './Review';

export default function FullInfoView() {
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const [movie, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    // setStatus(Status.PENDING);
    moviesAPI
      .fetchMoviesFullInfo(movieId)
      .then(({ poster_path, original_title, popularity, overview, genres }) => {
        setMovies({
          src: `https://image.tmdb.org/t/p/w500/${poster_path}`,
          title: original_title,
          score: popularity.toFixed(0),
          overview,
          genres,
        });
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError('Что то пошло не так');
        setStatus(Status.REJECTED);
      });
  }, [movieId]);

  return (
    <main>
      {status === Status.PENDING && <Loader />}
      {status === Status.REJCECTED && <ErrorMessage message={error} />}
      {status === Status.RESOLVED && (
        <>
          <img src={movie.src} alt={movie.title} />
          <h2>{movie.title}</h2>
          <p>User Score: {movie.score} %</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <ul>
            {movie.genres.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          <ul>
            <li>
              <NavLink to={`${url}/cast`}>Cast</NavLink>
            </li>
            <li>
              <NavLink to={`${url}/reviews`}>Reviews</NavLink>
            </li>
          </ul>

          <Route path={`${path}/cast`}>
            {status === Status.RESOLVED && <ActorsInfoView />}
          </Route>

          <Route path={`${path}/reviews`}>
            {status === Status.RESOLVED && <Review />}
          </Route>
        </>
      )}
    </main>
  );
}
