import MyLayout from "../components/Layouts/MyLayout";
import React from "react";
import ProductList from "../components/product/ProductList";
import Product from "../models/Product";
import { fetchProductsIfNeeded } from "../redux/actions/products";
import { connect } from "react-redux";

class Shop extends React.Component {
  static async getInitialProps({ store }) {
    const products = await store.dispatch(fetchProductsIfNeeded());
  }

  render() {    
    const productList = this.props.items.map(
      productData => new Product(productData)
    );
    return (
      <MyLayout>
        <ProductList products={productList} />
      </MyLayout>
    );
  }
}

export default connect(state => {
  return state.products;
})(Shop);
