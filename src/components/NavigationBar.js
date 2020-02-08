import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const isAdmin = false;
const isLoggedIn = false;

export default class NavigationBar extends Component {
  render() {
    const { isLoggedIn, isAdmin } = this.props;
    return (
      <div className="NavigationBar flex justify-around">
        <Link to="/">Home</Link>
        <Link to="/category/online">#online</Link>
        <Link href="/category/[categoryName]" as={`/products/mobile`}>#mobile</Link>
        {isAdmin && (
          <Fragment>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/products">Products</Link>
          </Fragment>
        )}
        {isLoggedIn ? (
          <Fragment>
            <Link to="/orders">Orders</Link>
            <Link to="/cart">
              My Cart
              {this.props.itemsInCart > 0 ? `(${this.props.itemsInCart})` : ``}
            </Link>
            <Link to="/logout">Logout</Link>
          </Fragment>
        ) : (
            <Link to="/account">Login</Link>
          )}
      </div>
    );
  }
}

NavigationBar.propTypes = {
  isLoggedIn: PropTypes.bool,
  isAdmin: PropTypes.bool,
  itemsInCart: PropTypes.number
};
