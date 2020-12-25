import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as moviesAPI from '../services/moviesDB-api';
import Status from '../components/Status';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

export default function Review() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    // setStatus(Status.PENDING);
    moviesAPI
      .fetchMoviesReview(movieId)
      .then(({ results }) => {
        setReviews(results);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError('У нас нет информации по данному фильму');
        setStatus(Status.REJECTED);
      });
  }, [movieId]);

  return (
    <>
      {status === Status.PENDING && <Loader />}
      {status === Status.REJECTED && <ErrorMessage message={error} />}
      {status === Status.RESOLVED && (
        <ul>
          {reviews.map(reviews => (
            <li key={reviews.id}>
              <h4>Author: {reviews.author}</h4>
              <p>{reviews.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
