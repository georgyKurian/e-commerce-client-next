import React from 'react';
import { connect } from 'react-redux';
import MyLayout from '../components/Layouts/MyLayout';
import ShoppingCartList from '../components/cart/ShoppingCartList';


const cart = ((props) => (
  <MyLayout title="Cart">
    <ShoppingCartList />
  </MyLayout>
));

export default cart;
