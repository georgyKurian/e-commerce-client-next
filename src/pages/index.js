import MyLayout from "../components/Layouts/MyLayout";
import React from "react";
import "../../styles/main.css";
import ProductList from "../components/product/ProductList";
import Product from "../models/Product";
import { fetchProductsIfNeeded } from "../redux/actions/products";
import { connect } from "react-redux";

class Index extends React.Component {
  static async getInitialProps({ store }) {
    await store.dispatch(fetchProductsIfNeeded());
  }

  render() {    
    if( this.props.items ){
      const productList = this.props.items.map(
        productData => new Product(productData)
      );
      return (
        <MyLayout>
          <ProductList products={productList} />
        </MyLayout>
      );
    }
    return null; 
  }
}

export default connect(state => {
  return state.products;
})(Index);
