import React from 'react';
import PropTypes from 'prop-types';
import Review from '../../models/Review';
import Rating from './Rating';
import UserAccountSVG from "../../../public/account_circle.svg";

export default function ReviewView({ review }) {
  return (
    <div className="mb-10 ReviewView">
      <span className="block text-sm font-semibold">
        <UserAccountSVG className="w-8 h-8 mr-2"/>
        {review.getcustomerName()}
      </span>
      <Rating rating={review.getRating()} className="mr-1" />
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
