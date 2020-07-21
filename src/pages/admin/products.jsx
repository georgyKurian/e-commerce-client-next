import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { fetchProductsIfNeeded } from '../../redux/actions/products';
import MyLayout from '../../components/Layouts/MyLayout';
import Product from '../../models/Product';
import ProductCard from '../../components/product/ProductCard';

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
        {productList.map(((product) => <ProductCard key={product.getId()} product />))}
      </MyLayout>
    );
  }
}

Products.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect((state) => state.products)(Products);
