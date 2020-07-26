import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyLayout from '../../components/Layouts/MyLayout';
import ProductView from '../../components/product/ProductView';
import Product from '../../models/Product';
import Review from '../../models/Review';
import ReviewList from '../../components/product/ReviewList';
import { fetchProductDetails } from '../../redux/actions/productDetails';
import { fetchReviews } from '../../redux/actions/reviews';
import Rating from '../../components/product/Rating';

class ProductPage extends React.Component {
  static async getInitialProps({ store, query }) {
    await Promise.all([
      store.dispatch(fetchProductDetails(query.id)),
      store.dispatch(fetchReviews(query.id)),
    ]);
  }

  render() {
    const { productDetails, reviews } = this.props;
    const product = new Product(productDetails.data);
    const reviewsList = reviews.items.map(
      (reviewData) => new Review(reviewData),
    );
    return (
      <MyLayout title={product.getName()} isPaddingTop={false} isNavFixed={false}>
        <ProductView
          product={product}
          ratingList={productDetails.reviewData.ratingSummary}
          reviewsList={reviewsList}
        />
      </MyLayout>
    );
  }
}

ProductPage.propTypes = {
  productDetails: PropTypes.arrayOf(PropTypes.object).isRequired,
  reviews: PropTypes.arrayOf(PropTypes.object),
};

ProductPage.defaultProps = {
  reviews: [],
};

export default connect(({ productDetails, reviews }) => ({
  productDetails,
  reviews,
}))(ProductPage);
