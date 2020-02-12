import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyLayout from '../../components/Layouts/MyLayout';
import ProductList from '../../components/product/ProductList';
import Product from '../../models/Product';
import { fetchProducts } from '../../redux/actions/products';
import '../../../styles/main.css';

class CategoryPage extends React.Component {
  static async getInitialProps({ store, query }) {
    await store.dispatch(fetchProducts(query.categorgyName));
  }

  render() {
    const { items } = this.props;
    const productList = items.map(
      (productData) => new Product(productData),
    );
    return (
      <MyLayout>
        <ProductList products={productList} />
      </MyLayout>
    );
  }
}

CategoryPage.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};


export default connect((state) => state.products)(CategoryPage);
