import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { fetchMovieItem } from '../../../api/movieAPI';
import { IMovie } from '../../../interfaces/movie.interface';

import Reviews from '../../reviews/reviews';
import Loader from '../../loader/loader';
import Buttons from '../../buttons/buttons';

const MovieItem: React.FC = () => {
  const { id } = useParams();

  const [data, setData] = useState<IMovie | null>(null);
  const [date, setDate] = useState('');
  const [stateData, setStateData] = useState('fulfilled');

  useEffect(() => {
    (async () => {
      try {
        setStateData('pending');

        const data = id ? await fetchMovieItem(id) : {};
        setStateData('fulfilled');
        setData(data);
      } catch {
        setStateData('rejected');
      }
    })();
  }, [id]);

  useEffect(() => {
    let date = data?.release_date;

    if (date) {
      setDate(format(new Date(date), 'yyyy'));
    }
  }, [data]);

  return (
    <>
      {stateData === 'pending' && <Loader />}
      {data && (
        <div className="movie__details__wrapper">
          <div className="product__item__pic set-bg movie__poster">
            <div className="product__item__bg movie__img">
              <img
                src={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
                alt="poster"
                className="poster__img"
              />
            </div>
            <div className="ep movie__ep">{data?.vote_average.toFixed(1)}</div>
            <div className="comment movie__comment">{date}</div>
          </div>
          <div className="movie__content">
            <div className="movie__details__text">
              <div className="movie__details__title">
                <h3>{data?.original_title}</h3>
              </div>
              <div className="movie__text">
                Genres:{' '}
                {data?.genres.map(({ id, name }) => (
                  <span key={id}>{name + ' '}</span>
                ))}
              </div>
              <div className="movie__text">
                Movie duration:{' '}
                <span>
                  {data?.runtime
                    ? (data.runtime / 60).toFixed(1) + ' hours'
                    : ''}
                </span>
              </div>
              <p>{data?.overview}</p>
              <div className="movie__details__btn">
                <Buttons
                  id={id ? id : ''}
                  title={data?.original_title}
                  img={data?.poster_path}
                />
                <Link
                  to={`/trailer${data?.poster_path}/${id}/${data?.original_title}`}
                  className="watch-btn"
                >
                  Watch Trailer Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {id && <Reviews id={id} />}
    </>
  );
};

export default MovieItem;
