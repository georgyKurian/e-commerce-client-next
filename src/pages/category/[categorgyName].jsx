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
    const { productMap, productIdList } = this.props;
    const productList = productIdList.map(
      (productId) => new Product(productMap[productId]),
    );
    return (
      <MyLayout title="Cateory">
        <ProductList products={productList} />
      </MyLayout>
    );
  }
}

CategoryPage.propTypes = {
  productMap: PropTypes.objectOf(PropTypes.shape({
    _id: PropTypes.string.required,
    name: PropTypes.string.required,
    price: PropTypes.number.required,
    images: PropTypes.number.required,
  })).isRequired,
  productIdList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect((state) => ({
  productMap: state.products.getId,
  productIdList: state.products.getAllIds,
}))(CategoryPage);
