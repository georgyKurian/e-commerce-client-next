import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';

const MobileMenu = ({
  isAdmin, isLoggedIn, onClose, isMenuClosing,
}) => {
  const firstLink = useRef(null);
  useEffect(() => {
    firstLink.current.focus();
  }, [firstLink]);
  return (
    <nav id="mobile-menu" className={`mobile-fly-in-menu ${isMenuClosing ? 'close' : ''}`}>
      <div className="relative flex items-center justify-center h-16 px-5">
        <span>LOGO</span>
        <button type="button" ref={firstLink} onClick={onClose} className="absolute right-0 p-2 mr-1">X</button>
      </div>
      <ul className="flex flex-col">
        <li>
          <Link href="/">
            <a className="">Home</a>
          </Link>
        </li>
        <li>
          <Link href="/category/[categoryName]" as="/category/shoes">
            <a>#Shoes</a>
          </Link>
        </li>
        {isAdmin && (
        <>
          <li>
            <Link href="/admin/users">
              <a>Users</a>
            </Link>
          </li>
          <li>
            <Link href="/admin/products">
              <a>Products</a>
            </Link>
          </li>
        </>
        )}
        {isLoggedIn ? (
          <>
            <li>
              <Link href="/orders">
                <a>Orders</a>
              </Link>
            </li>

            <li>
              <Link href="/logout">
                <a>Logout</a>
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

MobileMenu.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isMenuClosing: PropTypes.bool.isRequired.isRequired,
};

export default MobileMenu;
