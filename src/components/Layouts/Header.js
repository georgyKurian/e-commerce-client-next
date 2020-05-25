/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useState } from 'react';
import HamburgerIcon from '../../images/hamburger-icon.svg';
import ShoppingCart from '../../images/shopping_cart.svg';


const cssClasses = 'text-center py-4 px-4 text-sm text-themeGray-300 inline-block hover:text-white';

const Header = ({ isLoggedIn, itemsInCart, isAdmin }) => {
  const [isButtonToggled, setButtonToggled] = useState(false);
  function handleSearchToggleClick() {
    setButtonToggled(true);
  }
  return (
    <header className="fixed top-0 w-full bg-themeGray-700 z-10">
      <div className="inner-wrap flex flex-wrap items-center justify-center ">
        <nav className="hidden lg:block NavigationBar flex justify-center text-white" aria-label="Desktop Navigation">
          <Link href="/">
            <a className={cssClasses}>Home</a>
          </Link>
          <Link href="/shop">
            <a className={cssClasses}>Shop</a>
          </Link>
          <Link href="/category/[categoryName]" as="/category/mobile">
            <a className={cssClasses}>#mobile</a>
          </Link>
          {isAdmin && (
          <>
            <Link href="/admin/users">
              <a className={cssClasses}>Users</a>
            </Link>
            <Link href="/admin/products">
              <a className={cssClasses}>Products</a>
            </Link>
          </>
          )}
        </nav>
        <nav>
          {itemsInCart >= 0 ? (
            <Link href="/cart">
              <a className={cssClasses}>
                <div className="relative">
                  <ShoppingCart className="w-8 h-8 inline fill-current" />
                  {' '}
                  {itemsInCart > 0 ? (
                    <div className="absolute right-0 inset-y-0 ">
                      <div className="-mr-2 rounded-full w-5 h-5 leading-5 bg-red-700 text-white text-center">
                        {itemsInCart}
                      </div>
                    </div>
                  ) : ''}
                </div>
              </a>
            </Link>
          ) : null}
          {isLoggedIn ? (
            <>
              <Link href="/orders">
                <a className={cssClasses}>Orders</a>
              </Link>
              <Link href="/logout">
                <a className={cssClasses}>Logout</a>
              </Link>
            </>
          ) : (
            <Link href="/login">
              <a className={cssClasses}>Login</a>
            </Link>
          )}
        </nav>
        <div className="relative flex items-center my-2">
          {isButtonToggled ? (
            <>
              <input aria-label="search" className="rounded-full pl-3 pr-8 h-8 text-gray-700" type="text" placeholder="To be implemented!" />
              <button className="text-white px-2 py-2 mx-1 absolute right-0" type="submit"><img src="/search-icon.svg" alt="Search Icon" /></button>
            </>
          )
            : (
              <button type="button" onClick={handleSearchToggleClick}><img src="/search-icon.svg" alt="Search Icon" /></button>
            )}
        </div>
        <button className="text-gray-400 lg:hidden" type="button" aria-label="Open mobile menu"><HamburgerIcon className="fill-current" /></button>
      </div>
    </header>
  );
};

Header.propTypes = {
  itemsInCart: PropTypes.number,
  isLoggedIn: PropTypes.bool,
  isAdmin: PropTypes.bool,
};

Header.defaultProps = {
  itemsInCart: 0,
  isLoggedIn: 0,
  isAdmin: 0,
};

export default connect(({ auth: { user }, cart: {items:cartItems} }) => {
  const totalQuantity = cartItems.reduce((total, currentValue) => total + currentValue.quantity, 0);
  const authData = {
    itemsInCart: totalQuantity,
    isLoggedIn: false,
    isAdmin: false,
  };

  // eslint-disable-next-line no-underscore-dangle
  if (user && user.data && user.data._id) {
    authData.isLoggedIn = true;
    if (user.data.role && user.data.role === 'admin') {
      authData.isAdmin = true;
    }
  }
  return authData;
})(Header);
