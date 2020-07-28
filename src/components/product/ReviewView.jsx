import React from 'react';
import PropTypes from 'prop-types';
import Review from '../../models/Review';
import Rating from './Rating';
import UserAccountSVG from '../../../public/account_circle.svg';

export default function ReviewView({ review }) {
  return (
    <>
      <div className="my-8 ReviewView">
        <div className="flex items-center justify-between w-full">
          <span className="block text-sm font-semibold">
            <UserAccountSVG className="w-8 h-8 mr-2" />
            {review.getcustomerName()}
          </span>
          <span className="text-xs text-themeGray-600">{review.getFormattedUpdatedAt()}</span>
        </div>
        <Rating rating={review.getRating()} className="mr-1" />
        <span className="text-sm font-semibold">
          {review.getTitle()}
        </span>
        <p className="text-sm">{review.getComment()}</p>
      </div>
      <hr className="border-themeGray-500" />
    </>
  );
}

ReviewView.propTypes = {
  review: PropTypes.instanceOf(Review).isRequired,
};
