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
      <MyLayout title={product.getName()}>
        <ProductView product={product} />
        <hr />
        <div className="pb-2 border-b md:pr-8 md:w-1/3 md:float-left md:border-0">
          <h2 className="text-2xl">Customer reviews</h2>
          <Rating rating={50} />
        </div>
        <div className="md:pl-8 md:w-2/3 md:float-left">
          <ReviewList reviews={reviewsList} />
        </div>
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
