import { useState } from 'react';
import Link from 'next/link';
import PropTypes, { element } from 'prop-types';
import { connect, useSelector } from 'react-redux';

import HamburgerIcon from '../../images/icons/hamburger-icon.svg';
import ShoppingBag from '../../images/icons/shopping-bag.svg';
import SearchIcon from '../../images/icons/search-icon.svg';
import MobileMenu from './MobileMenu';

const linkDataList = [
  'help',
  'exchanges & returns',
  'order tracker',
  'newsletter signup',
  'creators club',
];

const Header = ({
  children, isFixed, itemsInCart, pageWrapperElement,
}) => {
  const [isButtonToggled, setButtonToggled] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isMenuClosing, setMenuClosing] = useState(false);

  const user = useSelector((state) => state.auth?.user);

  function handleSearchToggleClick() {
    setButtonToggled(true);
  }

  function handleMenuOpenButtonClick() {
    setMenuOpen(true);
    pageWrapperElement.current.classList.add('fixed');
  }

  function handleMenuCloseButtonClick() {
    setMenuClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setMenuClosing(false);
    }, 1000);

    pageWrapperElement.current.classList.remove('fixed');
  }

  return (
    <header>

      {isMenuOpen && <MobileMenu {...user} isMenuClosing={isMenuClosing} onClose={handleMenuCloseButtonClick} />}

      <div className={`${isFixed ? 'fixed top-0 z-10' : ''} w-full xl:px-10 border-b border-gray-400 outer-wrap bg-white`}>
        <div className="relative">
          <div className="justify-end hidden w-full lg:flex">
            <ul className="flex text-xs">
              {linkDataList.map((linkData) => (
                <li key={linkData}>
                  <Link href="/">
                    <a className="flex items-center h-8 px-3 text-gray-800 lowercase">{linkData}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center justify-between">
            <div className="flex-1">
              <button className="overflow-hidden text-gray-800 lg:hidden" type="button" aria-label="Open mobile menu" onClick={handleMenuOpenButtonClick}>
                <HamburgerIcon role="img" aria-label="Open Menu" className="w-16 h-12 p-3 stroke-current" />
              </button>
            </div>
            <div>
              <div className="inset-y-0 left-0 flex items-center lg:absolute">
                <span className="text-lg lg:text-5xl">LOGO</span>
                <span className="sr-only">Company Name</span>
              </div>
            </div>

            <div className="hidden lg:flex">
              <nav className="top-menu" aria-label="Shop Navigation">
                <div>
                  <Link href="/">
                    <a className="">Home</a>
                  </Link>
                </div>
                <div>
                  <Link href="/category/[categoryName]" as="/category/shoes">
                    <a>#Shoes</a>
                  </Link>
                </div>
                {user?.isAdmin && (
                <>
                  <div>
                    <Link href="/admin/users">
                      <a>Users</a>
                    </Link>
                  </div>
                  <div>
                    <Link href="/admin/products">
                      <a>Products</a>
                    </Link>
                  </div>
                </>
                )}
                {user?.isLoggedIn ? (
                  <>
                    <div>
                      <Link href="/orders">
                        <a>Orders</a>
                      </Link>
                    </div>

                    <div>
                      <Link href="/logout">
                        <a>Logout</a>
                      </Link>
                    </div>
                  </>
                ) : (
                  <div>
                    <Link href="/login">
                      <a>Login</a>
                    </Link>
                  </div>
                )}
              </nav>
            </div>
            <div className="flex justify-end flex-1">
              <div className="relative flex items-center">
                {isButtonToggled ? (
                  <>
                    <input aria-label="search" className="h-8 pl-3 pr-8 text-gray-700 rounded-full" type="text" placeholder="To be implemented!" />
                    <button className="absolute right-0 px-2 py-2 mx-1 text-white" type="submit"><img src="/search-icon.svg" alt="Search Icon" /></button>
                  </>
                ) : (
                  <button type="button" className="p-2 mr-2" onClick={handleSearchToggleClick}>
                    <SearchIcon role="img" aria-label="Search Icon" className="w-5 h-5" />
                  </button>
                )}
              </div>
              {itemsInCart >= 0 ? (
                <Link href="/cart">
                  <a className="flex items-center mr-5">
                    <div className="relative">
                      {itemsInCart > 0 ? (
                        <>
                          <ShoppingBag role="img" aria-label="Shopping Bag" className="inline w-8 h-8 p-1 text-gray-700 fill-current" />
                          {' '}
                          <div className="absolute inset-y-0 right-0">
                            <div className="flex items-center justify-center w-4 h-4 -mr-1 text-xs text-center text-white bg-red-700 rounded-full leading-5">
                              {itemsInCart}
                            </div>
                          </div>
                        </>
                      ) : ''}
                    </div>
                  </a>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className={(isFixed) ? 'w-full mt-16 lg:mt-16 xl:mt-16' : ''} />
      {children}
    </header>
  );
};

Header.propTypes = {
  children: PropTypes.element,
  itemsInCart: PropTypes.number,
  isFixed: PropTypes.bool,
  pageWrapperElement: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(element) }),
  ]).isRequired,
};

Header.defaultProps = {
  children: null,
  itemsInCart: 0,
  isFixed: true,
};

export default connect(({ cart: { items: cartItems } }) => {
  const totalQuantity = cartItems.reduce((total, currentValue) => total + currentValue.quantity, 0);
  return {
    itemsInCart: totalQuantity,
  };
})(Header);
