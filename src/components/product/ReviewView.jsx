import React from 'react';
import PropTypes from 'prop-types';
import Review from '../../models/Review';
import Rating from './Rating';

export default function ReviewView({ review }) {
  return (
    <div className="mb-5 ReviewView">
      <span className="block text-sm font-semibold">
        ICON:
        {review.getcustomerName()}
      </span>
      <Rating rating={review.getRating()} className="mr-2" />
      <span className="text-sm font-semibold">
        {review.getTitle()}
      </span>
      <p className="text-sm">{review.getComment()}</p>
    </div>
  );
}

ReviewView.propTypes = {
  review: PropTypes.instanceOf(Review).isRequired,
};
