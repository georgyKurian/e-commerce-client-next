import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { fetchProductsIfNeeded } from '../../redux/actions/products';
import MyLayout from '../../components/Layouts/MyLayout';
import ProductList from '../../components/product/ProductList';
import Product from '../../models/Product';


class Products extends React.Component {
  static async getInitialProps({ store }) {
    await store.dispatch(fetchProductsIfNeeded());
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

Products.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect((state) => state.products)(Products);
