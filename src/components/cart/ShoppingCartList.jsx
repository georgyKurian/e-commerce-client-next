import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Product from '../../models/Product';
import { removeFromCart } from '../../redux/actions/cart';
import CartItem from './CartItem';
import { fetchProductsIfNeeded } from '../../redux/actions/products';

class ShoppingCartList extends Component {
  handleRemoveItem() {
    const { dispatch } = this.props;
    dispatch(removeFromCart(this.id));
  }

  render() {
    const { cart: items, dispatch } = this.props;
    let flag = true;
    const cartItems = items
      .map((item) => {
        let product = null;
        if (item.product) {
          product = new Product(item.product);
          return (
            <CartItem
              key={product.getId()}
              name={product.getName()}
              avgRating={product.getAvgRating()}
              reviewCount={product.getReviewCount()}
              price={product.getFormattedPrice()}
              images={product.getImages()}
              quantity={item.quantity}
            />
          );
        } if (flag) {
          flag = false;
          dispatch(fetchProductsIfNeeded());
        }
        return (
          <CartItem
            key={item.productId}
            name=""
            avgRating=""
            reviewCount=""
            price=""
            images=""
            quantity={item.quantity}
          />
        );
      });

    return (
      <div>
        {cartItems.length > 0 ? (
          <>
            <div>
              {cartItems}
            </div>
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

export default connect(({ products: { items: productList }, cart }) => {
  const newCart = cart.map((cartItem) => {
    let foundProduct;
    if (productList) {
      foundProduct = productList.find((product) => product._id === cartItem.productId);
    }
    return { product: foundProduct, ...cartItem };
  });
  return { cart: newCart };
})(ShoppingCartList);
