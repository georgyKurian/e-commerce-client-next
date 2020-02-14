/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import PropTypes from 'prop-types';

const isAdmin = false;
const isLoggedIn = false;

const cssClasses = 'flex-1 text-center py-4 text-sm text-themeGray-300 hover:text-white';

const Header = ({ itemsInCart }) => (
  <header className="fixed top-0 w-full bg-themeGray-700 z-10">
    <nav className="NavigationBar inner-wrap flex justify-around text-white">
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
          <Link href="/cart">
            <a className={cssClasses}>
              My Cart
              {' '}
              {itemsInCart > 0 ? `(${itemsInCart})` : ''}
            </a>
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
  </header>
);

Header.propTypes = {
  itemsInCart: PropTypes.number.isRequired,
};

export default Header;
