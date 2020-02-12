/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { PrimaryButton, SecondaryButton } from '../Button';
import FeaturedTag from './FeaturedTag';
import Rating from './Rating';

export default class ProducrCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.images[0],
    };
  }

  handleMouseOver = () => {
    const { images } = this.props;
    if (images.length > 1) {
      this.setState({
        image: images[1],
      });
    }
  };

  handleMouseLeave = () => {
    this.setState({
      image: this.props.images[0],
    });
  };

  render() {
    const {
      id, name, isFeatured, avgRating, price, reviewCount, withRemoveButton, onRemove,
    } = this.props;
    return (
      <div
        className="flex flex-col relative flex-wrap justify-between rounded bg-themeGray-200 p-2"
        style={{ height: '22rem' }}
      >
        <div className="rounded overflow-hidden h-36">
          <Link href="/products/[id]" as={`/products/${id}`}>
            <a>
              <img
                src={this.state.image}
                alt="Product"
                onMouseEnter={this.handleMouseOver}
                onMouseLeave={this.handleMouseLeave}
              />
            </a>
          </Link>
        </div>
        {isFeatured && <FeaturedTag />}
        <Rating
          rating={avgRating}
          reviewCount={reviewCount}
        />
        <span className="text-orange-600 font-medium text-xl">
          {price}
        </span>
        <Link href="/products/[id]" as={`/products/${id}`}>
          <a className="text-blue-700">{name}</a>
        </Link>
        <div className="w-full text-center self-end">
          <SecondaryButton className="w-3/4 mx-auto self-end">
            View Details
          </SecondaryButton>
          <PrimaryButton className="w-3/4 mx-auto self-end m-1">
            Add to Bag
          </PrimaryButton>
        </div>

        {withRemoveButton && (
          <SecondaryButton onClick={onRemove}>
            Remove
          </SecondaryButton>
        )}
      </div>
    );
  }
}

ProducrCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  isFeatured: PropTypes.bool.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
  avgRating: PropTypes.number.isRequired,
  reviewCount: PropTypes.number.isRequired,
  withRemoveButton: PropTypes.bool,
  onRemove: PropTypes.func,
};

ProducrCard.defaultProps = {
  images: [],
  withRemoveButton: null,
  onRemove: null,
};
