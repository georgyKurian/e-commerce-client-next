import MyLayout from "../../components/Layouts/MyLayout";
import React from "react";
import ProductList from "../../components/product/ProductList";
import Product from "../../models/Product";
import { fetchProducts } from "../../redux/actions/products";
import { connect } from "react-redux";
import "../../../styles/main.css";

class CategoryPage extends React.Component {
  static async getInitialProps({ store, query }) {
    console.log(query);
    await store.dispatch(fetchProducts(query.categorgyName));
  }

  render() {    
    debugger;
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
})(CategoryPage);
