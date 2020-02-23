import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Product from '../models/Product';
import ProductCard from './product/ProductCard';
import { PrimaryButton } from './Button';
import { removeFromCart } from '../redux/actions/cart';

class ShoppingCartList extends Component {
  handleRemoveItem() {
    const { dispatch } = this.props;
    dispatch(removeFromCart(this.id));
  }

  render() {
    const { cart: items } = this.props;
    return (
      <div>
        {items.length > 0 ? (
          <>
            <div>
              {items
                .map((item) => new Product(item))
                .map((product, index) => (
                  <ProductCard
                    key={`${product.getId()}`}
                    name={product.getName()}
                    price={product.getFormattedPrice()}
                    images={product.getImages()}
                    withRemoveButton
                    onRemove={() => { this.handleRemoveItem(); }}
                  />
                ))}
            </div>
            <PrimaryButton onClick={this.props.onCheckout}>Checkout</PrimaryButton>
          </>
        ) : (
          <p>Your cart is empty. Add some awesome products!</p>
        )}
      </div>
    );
  }
}

ShoppingCartList.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    productId: PropTypes.string,
    quantity: PropTypes.string,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(({ cart }) => ({ cart }))(ShoppingCartList);
