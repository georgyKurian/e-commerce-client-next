import ProductList from '../../components/product/ProductList';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  products: state.products,
});

const ProductListContainer = connect(mapStateToProps)(ProductList);
export default ProductListContainer;
