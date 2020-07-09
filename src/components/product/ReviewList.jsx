import React from 'react';
import PropTypes from 'prop-types';
import Review from '../../models/Review';
import ReviewView from './ReviewView';

export default function ReviewList({ reviews }) {
  return (
    <div className="flex flex-row flex-wrap my-3 items-ceter">
      <h2 className="font-bold">Customer reviews</h2>
      {reviews.map((review) => (
        <div className="w-full" key={review.getId()}>
          <ReviewView review={review} />
        </div>
      ))}
    </div>
  );
}

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.instanceOf(Review)).isRequired,
};
