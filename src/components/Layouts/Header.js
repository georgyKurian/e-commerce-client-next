/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const cssClasses = 'text-center py-4 px-4 text-sm text-themeGray-300 hover:text-white';

const Header = ({ isLoggedIn, itemsInCart, isAdmin }) => (
  <header className="fixed top-0 w-full bg-themeGray-700 z-10">
    <div className="inner-wrap flex flex-wrap items-center justify-center ">
      <nav className="NavigationBar flex justify-center text-white">
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
        {itemsInCart >= 0 ? (
          <Link href="/cart">
            <a className={cssClasses}>
              My Cart
              {' '}
              {itemsInCart > 0 ? `(${itemsInCart})` : ''}
            </a>
          </Link>
        ) : null}
      </nav>
      <div className="relative flex items-center">
        <input className="rounded-full px-3" type="search" placeholder="To be implemented!" />
        <button className="text-white px-2 py-2 mx-1 absolute right-0" type="submit"><img src="/search-icon.svg" alt="Search Icon" /></button>
      </div>
    </div>
  </header>
);

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

export default connect(({ auth: { user }, cart }) => {
  const totalQuantity = cart.reduce((total, currentValue) => total + currentValue.quantity, 0);
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
