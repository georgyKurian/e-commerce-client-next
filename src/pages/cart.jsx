import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import MyLayout from '../components/Layouts/MyLayout';
import CartItem from '../components/cart/CartItem';
import { fetchProductsIfNeeded } from '../redux/actions/products';
import Cart from '../models/Cart';

const CartPage = (() => {
  const [isFetchProducts, setIsFetchProducts] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const productList = useSelector((state) => state.products.getId);
  const productIdList = useSelector((state) => state.products.getAllIds);
  const dispatch = useDispatch();


  const cartObject = useMemo(
    () => new Cart(cartItems, productList, productIdList),
    [cartItems, productList, productIdList],
  );

  const subTotal = cartObject.getTotalAmount();
  const totalQuantity = cartObject.getTotalQuantity();

  useEffect(() => {
    if (isFetchProducts) {
      dispatch(fetchProductsIfNeeded());
      setIsFetchProducts(true);
    }
  });

  const cartItemsComponents = cartObject.getItems()
    .map((item) => {
      if (item.product) {
        return (
          <CartItem
            key={item.product.getId()}
            id={item.product.getId()}
            name={item.product.getName()}
            avgRating={item.product.getAvgRating()}
            reviewCount={item.product.getReviewCount()}
            price={item.product.getFormattedPrice()}
            images={item.product.getImages()}
            quantity={item.quantity}
            total={item.formattedTotal}
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
          <div className="mb-2 bg-gray-200 lg:w-4/12 lg:float-right">
            <div className="flex flex-col items-center justify-around  w-full p-2 lg:px-4 lg:py-6">
              <span className="font-semibold">{`Cart Total ( ${(totalQuantity === 1 ? 'item' : 'items')})`}</span>
              <span className="text-3xl font-bold text-orange-600">
                {` $${subTotal / 100}`}
              </span>
              <Link href="/checkout">
                <a className="self-end w-32 w-3/4 m-1 mx-auto text-base text-center text-white bg-blue-400 rounded leading-10">Checkout</a>
              </Link>
            </div>
          </div>
          <div className="lg:w-8/12 lg:float-left">
            <div className="lg:pr-4">
              {cartItemsComponents}
            </div>
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

CartPage.propTypes = {
};

export default CartPage;
