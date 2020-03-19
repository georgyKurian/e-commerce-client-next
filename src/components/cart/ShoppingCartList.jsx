import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Product from '../../models/Product';
import { removeFromCart } from '../../redux/actions/cart';
import CartItem from './CartItem';
import { fetchProductsIfNeeded } from '../../redux/actions/products';
import { PrimaryButton } from '../Button';

class ShoppingCartList extends Component {
  handleRemoveItem() {
    const { dispatch } = this.props;
    dispatch(removeFromCart(this.id));
  }

  render() {
    const { cart: items, dispatch } = this.props;
    let flag = true;
    let subTotal = 0;
    let totalQuantity = 0;
    const cartItems = items
      .map((item) => {
        let product = null;
        if (item.product) {
          product = new Product(item.product);
          subTotal += item.quantity * product.getPrice();
          totalQuantity += item.quantity;
          return (
            <CartItem
              key={product.getId()}
              name={product.getName()}
              avgRating={product.getAvgRating()}
              reviewCount={product.getReviewCount()}
              price={product.getFormattedPrice()}
              images={product.getImages()}
              quantity={item.quantity}
              total={product.getFormattedSubtotal(item.quantity)}
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
          <div className="flex">
            <div className="xl:w-8/12">
              {cartItems}
            </div>
            <div className="flex flex-col items-center justify-around xl:w-4/12 px-4 mx-4 bg-gray-200">
              <span className="font-semibold">{`Cart Total (${totalQuantity} ${(totalQuantity === 1 ? 'item' : 'items')})`}</span>
              <span className="font-bold text-orange-600 text-3xl">
                {` $${subTotal / 100}`}
              </span>
              <PrimaryButton className="">Checkout</PrimaryButton>
            </div>
          </div>
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
      // eslint-disable-next-line no-underscore-dangle
      foundProduct = productList.find((product) => product._id === cartItem.productId);
    }
    return { product: foundProduct, ...cartItem };
  });
  return { cart: newCart };
})(ShoppingCartList);