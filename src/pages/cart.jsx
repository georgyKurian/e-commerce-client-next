import React from 'react';
import MyLayout from '../components/Layouts/MyLayout';
import ShoppingCartList from '../components/cart/ShoppingCartList';


const cart = (() => (
  <MyLayout title="Cart">
    <ShoppingCartList />
  </MyLayout>
));

export default cart;
