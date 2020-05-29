import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    const { productMap, productIdList } = this.props;
    const productList = productIdList.map(
      (productId) => new Product(productMap[productId]),
    );
    return (
      <MyLayout title="Shop">
        <ProductList products={productList} />
      </MyLayout>
    );
  }
}

Shop.propTypes = {
  productMap: PropTypes.arrayOf(PropTypes.object).isRequired,
  productIdList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect((state) => ({ productMap: state.products.getId, productIdList: state.products.getAllIds }))(Shop);
