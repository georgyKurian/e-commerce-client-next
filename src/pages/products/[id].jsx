import React from 'react';
import { connect } from 'react-redux';
import MyLayout from '../../components/Layouts/MyLayout';
import ProductView from '../../components/product/ProductView';
import Product from '../../models/Product';
import Review from '../../models/Review';
import ReviewList from '../../components/product/ReviewList';
import { fetchProductDetails } from '../../redux/actions/productDetails';
import { fetchReviews } from '../../redux/actions/reviews';

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
      <MyLayout>
        <ProductView product={product} />
        <ReviewList reviews={reviewsList} />
      </MyLayout>
    );
  }
}

export default connect(({ productDetails, reviews }) => ({
  productDetails,
  reviews,
}))(ProductPage);
