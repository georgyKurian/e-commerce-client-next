import MyLayout from "../../components/Layouts/MyLayout";
import React from "react";
import ProductView from "../../components/product/ProductView";
import Product from "../../models/Product";
import Review from "../../models/Review";
import { getProductDetails } from "../../api/Product";
import { getReviews } from "../../api/Review";
import ReviewList from "../../components/product/ReviewList";
import { connect } from "react-redux";
import { fetchProductDetails } from "../../redux/actions/productDetails";

class ProductPage extends React.Component {
  static async getInitialProps({store, query}) {
  
    const data = await Promise.all([
      getReviews(query.id),
      store.dispatch(fetchProductDetails(query.id))
    ]);
    return { reviewDataList: data[0] };
  }

  render() {
    const product = new Product(this.props.data);
    const reviews = this.props.reviewDataList.map(
      reviewData => new Review(reviewData)
    );
    return (
      <MyLayout>
        <ProductView product={product} />
        <ReviewList reviews={reviews} />
      </MyLayout>
    );
  }
}

export default connect(state => state.productDetails )(ProductPage);
