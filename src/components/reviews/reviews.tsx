import React, { useEffect, useState } from 'react';

import { IReview } from '../../interfaces/review.interface';
import { fetchReview } from '../../api/movieAPI';

import MovieTitle from '../movie/movieTitle';
import ReviewsItem from './reviewsItem/reviewsItem';
import Loader from '../loader/loader';

interface IProps {
  id: string;
}

const Reviews: React.FC<IProps> = ({ id }) => {
  const [data, setData] = useState<IReview[]>([]);
  const [stateData, setStateData] = useState('fulfilled');

  useEffect(() => {
    (async () => {
      try {
        setStateData('pending');

        const data = await fetchReview(id);
        setStateData('fulfilled');
        setData(data);
      } catch {
        setStateData('rejected');
      }
    })();
  }, [id]);

  return (
    <div className="movie__reviews review">
      <MovieTitle title="Reviews" />
      <div className="review__items">
        {stateData === 'pending' && <Loader />}
        {data &&
          data.map(item => (
            <ReviewsItem
              key={item.id}
              content={item.content}
              created_at={item.created_at}
              author={item.author}
              id={item.id}
            />
          ))}
        {data?.length === 0 && stateData === 'fulfilled' && (
          <div className="review__message">
            We have not found any comments for this movie.
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
