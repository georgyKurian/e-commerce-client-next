import MyLayout from "../../components/Layouts/MyLayout";
import React from "react";
import ProductView from "../../components/product/ProductView";
import Product from "../../models/Product";
import Review from "../../models/Review";
import { getProductDetails } from "../../api/Product";
import { getReviews } from "../../api/Review";
import ReviewList from "../../components/product/ReviewList";
import { connect } from "react-redux";

class ProductPage extends React.Component {
  static async getInitialProps({query}) {
    const data = await Promise.all([
      getProductDetails(query.id),
      getReviews(query.id)
    ]);
    return { productData: data[0], reviewDataList: data[1] };
  }

  render() {
    const product = new Product(this.props.productData);
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

export default connect(state => state.selectedProduct )(ProductPage);
