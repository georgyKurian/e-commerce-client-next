import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyLayout from '../components/Layouts/MyLayout';
import OrderItem from '../components/checkout/OrderItem';
import Product from '../models/Product';
import { fetchProductsIfNeeded } from '../redux/actions/products';
import AddressFields from '../components/checkout/AddressFields';
import Form from '../components/Form';


const Checkout = (({ cart: items, dispatch }) => {
  let flag = true;
  let subTotal = 0;
  let totalQuantity = 0;
  const orderItemsList = items
    .map((item) => {
      let product = null;
      if (item.product) {
        product = new Product(item.product);
        subTotal += item.quantity * product.getPrice();
        totalQuantity += item.quantity;
        return (
          <OrderItem
            key={product.getId()}
            id={product.getId()}
            name={product.getName()}
            price={product.getFormattedPrice()}
            quantity={item.quantity}
            total={product.getFormattedSubtotal(item.quantity)}
          />
        );
      }
      if (flag) {
        flag = false;
        dispatch(fetchProductsIfNeeded());
      }
      return (
        <OrderItem
          key={item.productId}
          id={item.productId}
          name=""
          price=""
          quantity={item.quantity}
          total=""
        />
      );
    });
  if (orderItemsList.length > 0) {
    return (
      <MyLayout title="Cart">
        <div className="lg:w-1/2 lg:float-left lg:pr-6">
          <div className="bg-gray-300 rounded-lg px-4 py-4">
            <Form className="w-full overflow-hidden">
              <h2>Billing Address</h2>
              <AddressFields />
            </Form>
          </div>
        </div>

        <div className="lg:w-1/2 lg:float-left">
          <div className="w-full bg-gray-200 px-4 py-4">
            <h2>Order Summary</h2>
            <div className="w-full table">
              {orderItemsList}
            </div>
          </div>
          <div className="flex flex-col items-center justify-around mb-2 p-2 bg-gray-200 lg:px-4 lg:px-4 lg:py-6">
            <span className="font-semibold">{`Cart Total (${totalQuantity} ${(totalQuantity === 1 ? 'item' : 'items')})`}</span>
            <span className="font-bold text-orange-600 text-3xl">
              {` $${subTotal / 100}`}
            </span>
            <Link href="/checkout/">
              <a className="rounded leading-10 text-center text-base w-32 bg-blue-400 text-white w-3/4 mx-auto self-end m-1">Submit</a>
            </Link>
          </div>
        </div>
      </MyLayout>
    );
  }

  return (
    <MyLayout title="Cart">
      <p>Your cart is empty. Add some awesome products!</p>
    </MyLayout>
  );
});


Checkout.propTypes = {
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
})(Checkout);
