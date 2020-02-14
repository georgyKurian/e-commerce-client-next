import { connect } from 'react-redux';
import React from 'react';
import { fetchProductsIfNeeded } from '../redux/actions/products';
import MyLayout from '../components/Layouts/MyLayout';
import ProductList from '../components/product/ProductList';
import Product from '../models/Product';


class Shop extends React.Component {
  static async getInitialProps({ store }) {
    await store.dispatch(fetchProductsIfNeeded());
  }

  render() {
    const productList = this.props.items.map(
      (productData) => new Product(productData),
    );
    return (
      <MyLayout>
        <ProductList products={productList} />
      </MyLayout>
    );
  }
}

export default connect((state) => state.products)(Shop);
