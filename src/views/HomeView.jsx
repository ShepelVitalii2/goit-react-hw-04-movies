import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import s from './Views.module.css';
import * as moviesAPI from '../services/moviesDB-api';
import Status from '../components/Status';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';

export default function HomeView() {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    setStatus(Status.PENDING);
    moviesAPI
      .fetchPopMovies()
      .then(({ results }) => {
        setMovies(results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError('Что то пошло не так');
        setStatus(Status.REJECTED);
      });
  }, []);

  return (
    <main>
      <h1 className={s.header}>Trenidng today</h1>
      {status === Status.PENDING && <Loader />}
      {status === Status.REJECTED && <ErrorMessage message={error} />}
      {status === Status.RESOLVED && (
        <ul>
          {movies.map(movies => (
            <li key={movies.id}>
              <Link to={`movies/${movies.id}`}>{movies.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
