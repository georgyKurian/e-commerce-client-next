import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Product from '../models/Product';
import { PrimaryButton } from './Button';
import { removeFromCart } from '../redux/actions/cart';
import CartItem from './cart/CartItem';

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
                .map((item) => ({ product: (new Product(item)), quantity: item.quantity }))
                .map(({ product, quantity }) => (
                  <CartItem
                    key={`${product.getId()}`}
                    name={product.getName()}
                    price={product.getFormattedPrice()}
                    images={product.getImages()}
                    quantity={quantity}
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
