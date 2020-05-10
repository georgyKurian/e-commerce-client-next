import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyLayout from '../components/Layouts/MyLayout';
import CartItem from '../components/cart/CartItem';
import Product from '../models/Product';
import { fetchProductsIfNeeded } from '../redux/actions/products';


const CartPage = (({ cart: items, dispatch }) => {
  let subTotal = 0;
  let totalQuantity = 0;

  const [isFetchProducts, setIsFetchProducts] = useState(false);

  useEffect(() => {
    if (isFetchProducts) {
      dispatch(fetchProductsIfNeeded());
      setIsFetchProducts(true);
    }
  });

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
            id={product.getId()}
            name={product.getName()}
            avgRating={product.getAvgRating()}
            reviewCount={product.getReviewCount()}
            price={product.getFormattedPrice()}
            images={product.getImages()}
            quantity={item.quantity}
            total={product.getFormattedSubtotal(item.quantity)}
          />
        );
      }
      if (!isFetchProducts) {
        setIsFetchProducts(true);
      }
      return (
        <CartItem
          key={item.productId}
          id={item.productId}
          name=""
          avgRating={0}
          reviewCount={0}
          price=""
          images={[]}
          total="0.00"
          quantity={item.quantity}
        />
      );
    });
  if (cartItems.length > 0) {
    return (
      <MyLayout title="Cart">
        <>
          <div className="flex flex-col items-center justify-around mb-2 p-2 bg-gray-200 lg:px-4 lg:px-4 lg:py-6 lg:w-4/12 lg:float-right">
            <span className="font-semibold">{`Cart Total ( ${(totalQuantity === 1 ? 'item' : 'items')})`}</span>
            <span className="font-bold text-orange-600 text-3xl">
              {` $${subTotal / 100}`}
            </span>
            <Link href="/checkout">
              <a className="rounded leading-10 text-center text-base w-32 bg-blue-400 text-white w-3/4 mx-auto self-end m-1">Checkout</a>
            </Link>
          </div>
          <div className="lg:w-8/12 lg:float-left lg:px-4">
            {cartItems}
          </div>
        </>
      </MyLayout>
    );
  }

  return (
    <MyLayout title="Cart">
      <p>Your cart is empty. Add some awesome products!</p>
    </MyLayout>
  );
});

CartPage.com;


CartPage.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    productId: PropTypes.string,
    quantity: PropTypes.number,
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
})(CartPage);
