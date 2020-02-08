import { connect } from 'react-redux';
import ProductList from '../../components/product/ProductList';

const mapStateToProps = (state) => ({
  products: state.products,
});

const ProductListContainer = connect(mapStateToProps)(ProductList);
export default ProductListContainer;
