import React from 'react';
import PropTypes from 'prop-types';
import Review from '../../models/Review';
import Rating from './Rating';

export default function ReviewView({ review }) {
  return (
    <div className="ReviewView">
      <h2 className="text-sm font-semibold">
        {review.getTitle()}
      </h2>
      <p className="text-sm">{review.getComment()}</p>
      <Rating rating={review.getRating()} />
    </div>
  );
}

ReviewView.propTypes = {
  review: PropTypes.instanceOf(Review).isRequired,
};
