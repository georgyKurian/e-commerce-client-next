/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { useState } from 'react';
import HamburgerIcon from '../../images/hamburger-icon.svg';
import ShoppingCart from '../../images/shopping_cart.svg';


const cssClasses = 'text-center py-4 px-4 text-sm text-themeGray-300 inline-block hover:text-white';

const Header = ({ itemsInCart }) => {
  const [isButtonToggled, setButtonToggled] = useState(false);
  const user = useSelector((state) => state.auth?.user);

  function handleSearchToggleClick() {
    setButtonToggled(true);
  }

  return (
    <header className="fixed top-0 z-10 w-full bg-themeGray-700">
      <div className="flex flex-wrap items-center justify-center inner-wrap">
        <nav className="flex justify-center hidden text-white lg:block NavigationBar" aria-label="Desktop Navigation">
          <Link href="/">
            <a className={cssClasses}>Home</a>
          </Link>
          <Link href="/shop">
            <a className={cssClasses}>Shop</a>
          </Link>
          <Link href="/category/[categoryName]" as="/category/mobile">
            <a className={cssClasses}>#mobile</a>
          </Link>
          {user?.isAdmin && (
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
                  <ShoppingCart className="inline w-8 h-8 fill-current" />
                  {' '}
                  {itemsInCart > 0 ? (
                    <div className="absolute inset-y-0 right-0">
                      <div className="w-5 h-5 -mr-2 text-center text-white bg-red-700 rounded-full leading-5">
                        {itemsInCart}
                      </div>
                    </div>
                  ) : ''}
                </div>
              </a>
            </Link>
          ) : null}
          {user?.isLoggedIn ? (
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
              <input aria-label="search" className="h-8 pl-3 pr-8 text-gray-700 rounded-full" type="text" placeholder="To be implemented!" />
              <button className="absolute right-0 px-2 py-2 mx-1 text-white" type="submit"><img src="/search-icon.svg" alt="Search Icon" /></button>
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
};

Header.defaultProps = {
  itemsInCart: 0,
};

export default connect(({ cart: { items: cartItems } }) => {
  const totalQuantity = cartItems.reduce((total, currentValue) => total + currentValue.quantity, 0);
  return {
    itemsInCart: totalQuantity,
  };
})(Header);
