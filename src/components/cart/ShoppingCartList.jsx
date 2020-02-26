import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Product from '../../models/Product';
import { removeFromCart } from '../../redux/actions/cart';
import CartItem from './CartItem';

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
                .map((item) => ({ product: (new Product(item.product)), quantity: item.quantity }))
                .map(({ product, quantity }) => (
                  <CartItem
                    key={`${product.getId()}`}
                    name={product.getName()}
                    avgRating={product.getAvgRating()}
                    reviewCount={product.getReviewCount()}
                    price={product.getFormattedPrice()}
                    images={product.getImages()}
                    quantity={quantity}
                  />
                ))}
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
    const foundProduct = productList.find((product) => product._id === cartItem.productId);
    return { product: foundProduct, ...cartItem };
  });
  return { cart: newCart };
})(ShoppingCartList);
