/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SecondaryButton } from '../Button';
import FeaturedTag from './FeaturedTag';
import Rating from './Rating';
import { addToCart } from '../../redux/actions/cart';
import AddSvgIcon from '../../../public/add.svg';

class ProducrCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.images[0],
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

  handleAddToBag = async () => {
    const { id, dispatch } = this.props;
    dispatch(addToCart(id));
  }

  render() {
    const {
      id, name, isFeatured, avgRating, price, reviewCount, withRemoveButton, onRemove,
    } = this.props;
    return (
      <div
        className="relative flex flex-col flex-wrap justify-between overflow-hidden border border-transparent rounded hover:border-gray-200"
      >
        <div className="relative overflow-hidden rounded">
          <Link href="/products/[id]" as={`/products/${id}`}>
            <a>
              <img
                src={this.state.image}
                alt="Product"
                onMouseEnter={this.handleMouseOver}
                onMouseLeave={this.handleMouseLeave}
              />
              {isFeatured && <FeaturedTag className="absolute top-0 right-0 mx-1" />}
            </a>
          </Link>
          <button title="Add to Bag" type="button" className="absolute bottom-0 right-0 float-right w-8 h-8 p-1 m-2 text-base border border-white rounded opacity-75 hover:opacity-100" onClick={this.handleAddToBag}>
            <AddSvgIcon className="mx-auto text-white fill-current" />
          </button>
        </div>
        <div className="flex justify-between px-2">
          <div>
            <Link href="/products/[id]" as={`/products/${id}`}>
              <a className="text-gray-700">{name}</a>
            </Link>
            <Rating
              rating={avgRating}
              reviewCount={reviewCount}
            />
          </div>
          <span className="font-medium text-gray-800">
            {price}
          </span>
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
  dispatch: PropTypes.func.isRequired,
};

ProducrCard.defaultProps = {
  images: [],
  withRemoveButton: null,
  onRemove: null,

};

export default connect()(ProducrCard);
