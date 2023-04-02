import React, { useEffect, useState } from 'react';

import { IReview } from '../../../interfaces/review.interface';
import { format } from 'date-fns';

const ReviewsItem: React.FC<IReview> = ({ created_at, content, author }) => {
  const [date, setDate] = useState('');

  useEffect(() => {
    setDate(format(new Date(created_at), 'MM.dd.yyyy'));
  }, [created_at]);

  return (
    <div className="review__item">
      <div className="review__head">
        <div className="review__title">{author}</div>
        <div className="review__date">{date}</div>
      </div>
      <div className="review__text">{content}</div>
    </div>
  );
};

export default ReviewsItem;
