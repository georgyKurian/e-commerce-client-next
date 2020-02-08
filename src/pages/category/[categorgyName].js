import React from 'react';
import { connect } from 'react-redux';
import MyLayout from '../../components/Layouts/MyLayout';
import ProductList from '../../components/product/ProductList';
import Product from '../../models/Product';
import { fetchProducts } from '../../redux/actions/products';
import '../../../styles/main.css';

class CategoryPage extends React.Component {
  static async getInitialProps({ store, query }) {
    console.log(query);
    await store.dispatch(fetchProducts(query.categorgyName));
  }

  render() {
    debugger;
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

export default connect((state) => state.products)(CategoryPage);
