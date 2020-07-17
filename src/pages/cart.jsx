import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MyLayout from '../components/Layouts/MyLayout';
import CartItem from '../components/cart/CartItem';
import { fetchProductsIfNeeded } from '../redux/actions/products';
import Cart from '../models/Cart';
import { PrimaryLink } from '../components/Button';

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
        <div className="inner-wrap">
          <div className="flex flex-wrap items-start px-4 mx-auto overflow-hidden xl:w-9/12">
            <header className="w-full">
              <h1 className="font-semibold">Your Bag</h1>
              <div>
                <span className="uppercase">Total</span>
                <span>{` [ ${totalQuantity} ${(totalQuantity === 1 ? 'item' : 'items')} ] `}</span>
                <span className="ml-2 text-lg font-semibold">{`$${subTotal / 100}`}</span>
              </div>
              <hr className="mt-8 border-gray-600 lg:hidden" />
            </header>

            <main className="w-full mt-10 lg:flex-1 section">
              {cartItemsComponents}
            </main>

            <aside className="w-full mt-10 lg:ml-16 section lg:w-1/3">
              <div className="flex flex-col items-center justify-around w-full mb-4">
                <PrimaryLink href="/checkout">Checkout</PrimaryLink>
              </div>
              <div className="px-4 py-6 border-2 border-gray-200">
                <h5 className="uppercase">Order Summary</h5>
                <table className="w-full text-sm uppercase">
                  <tbody>
                    <tr>
                      <td className="pb-3">{`${totalQuantity} ${(totalQuantity === 1 ? 'item' : 'items')}`}</td>
                      <td className="pb-3 text-right">{subTotal}</td>
                    </tr>
                    <tr>
                      <td className="pb-3 ">Delivery</td>
                      <td className="pb-3 text-right">Free</td>
                    </tr>
                    <tr>
                      <td className="pb-3 capitalize">Sales Tax</td>
                      <td className="pb-3 text-right">-</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Total</td>
                      <td className="text-base font-semibold text-right">
                        C$
                        {' '}
                        {subTotal}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </aside>

          </div>
        </div>
      </MyLayout>
    );
  }

  return (
    <MyLayout title="Cart">
      <div className="inner-wrap">
        <div className="flex justify-center p-6 mx-auto bg-gray-200 border border-gray-300 rounded xl:w-2/3">
          <p>Your cart is empty. Add some awesome products!</p>
        </div>
      </div>
    </MyLayout>
  );
});

CartPage.propTypes = {
};

export default CartPage;
